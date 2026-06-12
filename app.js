let workbook = null;
let originalFileName = "Lagerplanung.xlsx";
let selectedSlot = null;
let html5QrCode = null;
let lastFoundSlot = null;

const changedValues = new Map();
const collapsedAreas = new Set(JSON.parse(localStorage.getItem("collapsedAreas") || "[]"));

const els = {
  fileInput: document.getElementById("fileInput"),
  fileStatus: document.getElementById("fileStatus"),
  downloadBtn: document.getElementById("downloadBtn"),
  clearChangesBtn: document.getElementById("clearChangesBtn"),
  loadJsonBtn: document.getElementById("loadJsonBtn"),
  saveJsonBtn: document.getElementById("saveJsonBtn"),
  jsonInput: document.getElementById("jsonInput"),
  selectedSlot: document.getElementById("selectedSlot"),
  selectedCell: document.getElementById("selectedCell"),
  currentValue: document.getElementById("currentValue"),
  orderInput: document.getElementById("orderInput"),
  scanBtn: document.getElementById("scanBtn"),
  saveBtn: document.getElementById("saveBtn"),
  emptyBtn: document.getElementById("emptyBtn"),
  scannerWrap: document.getElementById("scannerWrap"),
  stopScanBtn: document.getElementById("stopScanBtn"),
  message: document.getElementById("message"),
  warehouse: document.getElementById("warehouse"),
  statsBox: document.getElementById("statsBox"),
  searchInput: document.getElementById("searchInput"),
  searchBtn: document.getElementById("searchBtn"),
  findFreeBtn: document.getElementById("findFreeBtn"),
  outInput: document.getElementById("outInput"),
  outSearchBtn: document.getElementById("outSearchBtn"),
  outClearBtn: document.getElementById("outClearBtn"),
  toggleDarkBtn: document.getElementById("toggleDarkBtn"),
  ocrBtn: document.getElementById("ocrBtn"),
  ocrImageInput: document.getElementById("ocrImageInput"),
  ocrImageInput: document.getElementById("ocrImageInput"),
liveOcrBtn: document.getElementById("liveOcrBtn"),
stopLiveOcrBtn: document.getElementById("stopLiveOcrBtn"),
liveOcrWrap: document.getElementById("liveOcrWrap"),
liveOcrVideo: document.getElementById("liveOcrVideo"),
liveOcrCanvas: document.getElementById("liveOcrCanvas")
};

function setMessage(text, type = "") {
  els.message.textContent = text;
  els.message.className = `message ${type}`;
}

function key(slot) {
  return `${slot.sheet}!${slot.cell}`;
}

function esc(str) {
  return String(str)
    .split("&").join("&amp;")
    .split("<").join("&lt;")
    .split(">").join("&gt;")
    .split("'").join("&#39;")
    .split('"').join("&quot;");
}

function colToName(col) {
  let name = "";
  let n = col;
  while (n > 0) {
    const r = (n - 1) % 26;
    name = String.fromCharCode(65 + r) + name;
    n = Math.floor((n - 1) / 26);
  }
  return name;
}

function getCellValue(sheetName, cellAddress) {
  if (!workbook) return "";
  const sheet = workbook.Sheets[sheetName];
  if (!sheet) return "";
  const cell = sheet[cellAddress];
  return cell && cell.v != null ? String(cell.v) : "";
}

function setCellValue(sheetName, cellAddress, value) {
  if (!workbook) return false;

  let sheet = workbook.Sheets[sheetName];

  if (!sheet) {
    sheet = {};
    workbook.Sheets[sheetName] = sheet;
    if (!workbook.SheetNames.includes(sheetName)) {
      workbook.SheetNames.push(sheetName);
    }
  }

  XLSX.utils.sheet_add_aoa(sheet, [[value]], { origin: cellAddress });
  return true;
}

function displayValue(slot) {
  if (changedValues.has(key(slot))) {
    return changedValues.get(key(slot));
  }

  const val = getCellValue(slot.sheet, slot.cell);
  if (!val) return "";

  return String(val).trim() === String(slot.label).trim() ? "" : String(val);
}

function occupied(slot) {
  return displayValue(slot).trim() !== "";
}

function saveLocalDraft() {
  localStorage.setItem("lagerplanungDraft", JSON.stringify(Array.from(changedValues.entries())));
}

function loadLocalDraft() {
  try {
    const data = JSON.parse(localStorage.getItem("lagerplanungDraft") || "[]");
    changedValues.clear();
    data.forEach(([k, v]) => changedValues.set(k, v));
  } catch (e) {}
}

function saveUiState() {
  localStorage.setItem("collapsedAreas", JSON.stringify(Array.from(collapsedAreas)));
}

function createSlot(slot, minRow, minCol) {
  const btn = document.createElement("button");
  btn.type = "button";
  btn.className = "slot";

  const val = displayValue(slot);

  if (selectedSlot && selectedSlot.id === slot.id) {
    btn.classList.add("selected");
  } else if (changedValues.has(key(slot))) {
    btn.classList.add("changed");
  } else if (occupied(slot)) {
    btn.classList.add("occupied");
  } else {
    btn.classList.add("free");
  }

  btn.style.gridColumn = String(slot.col - minCol + 2);
  btn.style.gridRow = String(slot.row - minRow + 2);

  btn.innerHTML = `
    <div class="slot-label">${esc(slot.label)}</div>
    <div class="slot-value">${esc(val || "frei")}</div>
  `;

  btn.addEventListener("click", () => selectSlot(slot));
  return btn;
}

function renderWarehouse() {
  els.warehouse.innerHTML = "";

  AREAS.forEach(area => {
    const areaSlots = MAPPING.filter(s => s.area === area);
    if (!areaSlots.length) return;

    const minRow = Math.min(...areaSlots.map(s => s.row));
    const maxRow = Math.max(...areaSlots.map(s => s.row));
    const minCol = Math.min(...areaSlots.map(s => s.col));
    const maxCol = Math.max(...areaSlots.map(s => s.col));

    const sec = document.createElement("section");
    sec.className = "area";

    if (collapsedAreas.has(area)) {
      sec.classList.add("collapsed");
    }

    const title = document.createElement("h2");
    title.className = "area-title";
    title.textContent = area;

    title.addEventListener("click", () => {
      if (collapsedAreas.has(area)) {
        collapsedAreas.delete(area);
        sec.classList.remove("collapsed");
      } else {
        collapsedAreas.add(area);
        sec.classList.add("collapsed");
      }
      saveUiState();
    });

    const grid = document.createElement("div");
    grid.className = "excel-grid";
    grid.style.gridTemplateColumns = `34px repeat(${maxCol - minCol + 1}, minmax(66px, 1fr))`;
    grid.style.gridTemplateRows = `22px repeat(${maxRow - minRow + 1}, minmax(46px, auto))`;

    for (let c = minCol; c <= maxCol; c++) {
      const label = document.createElement("div");
      label.className = "axis-label";
      label.style.gridColumn = String(c - minCol + 2);
      label.style.gridRow = "1";
      label.textContent = colToName(c);
      grid.appendChild(label);
    }

    for (let r = minRow; r <= maxRow; r++) {
      const label = document.createElement("div");
      label.className = "axis-label row-label";
      label.style.gridColumn = "1";
      label.style.gridRow = String(r - minRow + 2);
      label.textContent = r;
      grid.appendChild(label);
    }

    areaSlots.forEach(slot => grid.appendChild(createSlot(slot, minRow, minCol)));

    sec.appendChild(title);
    sec.appendChild(grid);
    els.warehouse.appendChild(sec);
  });

  updateStats();
}

function selectSlot(slot) {
  selectedSlot = slot;
  const val = displayValue(slot);

  els.selectedSlot.textContent = slot.label;
  els.selectedCell.textContent = `${slot.sheet} / ${slot.cell}`;
  els.currentValue.textContent = val || "-";
  els.orderInput.value = val || "";

  els.scanBtn.disabled = false;
  els.saveBtn.disabled = false;
  els.emptyBtn.disabled = false;
  els.ocrBtn.disabled = false;
  els.liveOcrBtn.disabled = false;

  setMessage(`Lagerplatz ${slot.label} (${slot.cell}) ausgewählt.`, "ok");
  renderWarehouse();

  setTimeout(() => {
    const selected = document.querySelector(".slot.selected");
    if (selected) {
      selected.scrollIntoView({ behavior: "smooth", block: "center", inline: "center" });
    }
  }, 100);
}

async function saveSelected(valueOverride = null) {
  if (!selectedSlot) {
    setMessage("Bitte zuerst einen Lagerplatz auswählen.", "error");
    return;
  }

  const value = valueOverride !== null ? valueOverride : els.orderInput.value.trim();

  if (workbook) {
    setCellValue(selectedSlot.sheet, selectedSlot.cell, value);
  }

  changedValues.set(key(selectedSlot), value);
  saveLocalDraft();

  els.currentValue.textContent = value || "-";
  els.downloadBtn.disabled = false;
  els.clearChangesBtn.disabled = false;

  renderWarehouse();

  await saveSlotToFirestore(selectedSlot, value);
}

function handleFile(file) {
  if (!file) return;

  originalFileName = file.name || "Lagerplanung.xlsx";

  const reader = new FileReader();

  reader.onload = e => {
    try {
      workbook = XLSX.read(new Uint8Array(e.target.result), { type: "array" });
      els.fileStatus.textContent = `Geladen: ${originalFileName}`;
      els.downloadBtn.disabled = false;
      els.clearChangesBtn.disabled = false;
      setMessage("Excel-Datei geladen.", "ok");
      renderWarehouse();
    } catch (err) {
      console.error(err);
      setMessage("Excel-Datei konnte nicht gelesen werden.", "error");
    }
  };

  reader.readAsArrayBuffer(file);
}

function downloadExcel() {
  if (!workbook) {
    setMessage("Keine Excel-Datei geladen.", "error");
    return;
  }

  const out = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
  const blob = new Blob([out], {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
  });

  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);

  let cleanName = originalFileName;
  cleanName = cleanName.endsWith(".xlsx") ? cleanName.slice(0, -5) : cleanName;
  cleanName = cleanName.endsWith(".xls") ? cleanName.slice(0, -4) : cleanName;

  a.download = cleanName + "_aktualisiert.xlsx";

  document.body.appendChild(a);
  a.click();
  a.remove();

  setMessage("Aktualisierte Excel-Datei wurde erstellt.", "ok");
}

function buildLagerJson() {
  const data = {};

  MAPPING.forEach(slot => {
    const value = displayValue(slot);

    if (value && value.trim() !== "") {
      data[slot.id] = {
        id: slot.id,
        label: slot.label,
        sheet: slot.sheet,
        cell: slot.cell,
        value
      };
    }
  });

  return data;
}

function applyLagerJson(data) {
  changedValues.clear();

  Object.values(data || {}).forEach(entry => {
    const slot = MAPPING.find(s =>
      s.id === entry.id ||
      s.label === entry.label ||
      s.cell === entry.cell
    );

    if (slot) {
      changedValues.set(key(slot), entry.value || "");
    }
  });

  saveLocalDraft();
  renderWarehouse();
}

function exportJsonData() {
  const blob = new Blob([JSON.stringify(buildLagerJson(), null, 2)], {
    type: "application/json"
  });

  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = "lagerdaten.json";

  document.body.appendChild(a);
  a.click();
  a.remove();

  setMessage("lagerdaten.json wurde erstellt.", "ok");
}

function importJsonData(file) {
  if (!file) return;

  const reader = new FileReader();

  reader.onload = e => {
    try {
      const text = String(e.target.result || "").trim();
      const data = text ? JSON.parse(text) : {};
      applyLagerJson(data);
      setMessage("JSON-Daten wurden geladen.", "ok");
    } catch (err) {
      console.error(err);
      setMessage("JSON-Datei konnte nicht gelesen werden.", "error");
    }
  };

  reader.readAsText(file);
}

function findSlotByValueOrLabel(query) {
  const q = String(query || "").trim().toLowerCase();
  if (!q) return null;

  return MAPPING.find(slot => {
    const label = String(slot.label || "").toLowerCase();
    const value = String(displayValue(slot) || "").toLowerCase();

    return label === q || value === q || label.includes(q) || value.includes(q);
  }) || null;
}

function updateStats() {
  if (!els.statsBox) return;

  let html = "";
  let totalAll = 0;
  let occupiedAll = 0;

  AREAS.forEach(area => {
    const areaSlots = MAPPING.filter(s => s.area === area);
    const total = areaSlots.length;
    const used = areaSlots.filter(s => occupied(s)).length;

    totalAll += total;
    occupiedAll += used;

    const percent = total ? Math.round((used / total) * 100) : 0;

    html += `
      <div class="stat-card">
        ${area}
        <small>${used} / ${total} belegt · ${percent}%</small>
      </div>
    `;
  });

  const percentAll = totalAll ? Math.round((occupiedAll / totalAll) * 100) : 0;

  els.statsBox.innerHTML = `
    <div class="stat-card">
      Gesamt
      <small>${occupiedAll} / ${totalAll} belegt · ${percentAll}%</small>
    </div>
  ` + html;
}

function searchSlot() {
  const slot = findSlotByValueOrLabel(els.searchInput.value);

  if (!slot) {
    setMessage("Kein Lagerplatz oder Auftrag gefunden.", "error");
    return;
  }

  collapsedAreas.delete(slot.area);
  saveUiState();
  selectSlot(slot);

  setMessage(`Gefunden: ${slot.label} in ${slot.area}`, "ok");
}

function findFreeSlot() {
  const slot = MAPPING.find(s => !occupied(s));

  if (!slot) {
    setMessage("Kein freier Lagerplatz gefunden.", "error");
    return;
  }

  collapsedAreas.delete(slot.area);
  saveUiState();
  selectSlot(slot);

  setMessage(`Nächster freier Platz: ${slot.label}`, "ok");
}

function findOutgoingOrder() {
  const slot = findSlotByValueOrLabel(els.outInput.value);

  if (!slot) {
    lastFoundSlot = null;
    setMessage("Auftrag wurde nicht gefunden.", "error");
    return;
  }

  lastFoundSlot = slot;

  collapsedAreas.delete(slot.area);
  saveUiState();
  selectSlot(slot);

  setMessage(`Auftrag gefunden: ${displayValue(slot)} liegt auf ${slot.label}`, "ok");
}

async function clearFoundOutgoingSlot() {
  if (!lastFoundSlot && selectedSlot) {
    lastFoundSlot = selectedSlot;
  }

  if (!lastFoundSlot) {
    setMessage("Erst einen Auftrag suchen.", "error");
    return;
  }

  selectedSlot = lastFoundSlot;
  els.orderInput.value = "";

  await saveSelected("");

  setMessage(`Platz geleert: ${lastFoundSlot.label}`, "ok");
  lastFoundSlot = null;
}

function toggleDarkMode() {
  document.body.classList.toggle("dark");
  localStorage.setItem("darkMode", document.body.classList.contains("dark") ? "1" : "0");
}

function extractOrderNumber(text) {
  const clean = String(text || "")
    .replace(/\s+/g, " ")
    .replace(/O/g, "0")
    .replace(/o/g, "0");

  let match = clean.match(/[VI]\s*([0-9]{5,8})\s*\/\s*([0-9]{1,4})/i);

  if (match) {
    return `${match[1]}/${match[2]}`;
  }

  match = clean.match(/[VI]\s*([0-9]{5,8})/i);

  if (match) {
    return match[1];
  }

  return null;
}

function preprocessImageForOcr(file) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const reader = new FileReader();

    reader.onload = e => {
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");

        const cropX = 0;
        const cropY = 0;
        const cropW = img.width;
        const cropH = Math.floor(img.height * 0.38);

        canvas.width = cropW;
        canvas.height = cropH;

        ctx.drawImage(img, cropX, cropY, cropW, cropH, 0, 0, cropW, cropH);

        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imageData.data;

        for (let i = 0; i < data.length; i += 4) {
          const gray = data[i] * 0.3 + data[i + 1] * 0.59 + data[i + 2] * 0.11;
          const value = gray > 150 ? 255 : 0;

          data[i] = value;
          data[i + 1] = value;
          data[i + 2] = value;
        }

        ctx.putImageData(imageData, 0, 0);
        resolve(canvas);
      };

      img.onerror = reject;
      img.src = e.target.result;
    };

    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

async function scanOrderNumberWithOcr(file) {
  if (!selectedSlot) {
    setMessage("Bitte zuerst einen Lagerplatz auswählen.", "error");
    return;
  }

  if (!file) return;

  if (!window.Tesseract) {
    setMessage("OCR-Bibliothek wurde nicht geladen.", "error");
    return;
  }

  try {
    setMessage("Auftragsschein wird gelesen...", "ok");

    const canvas = await preprocessImageForOcr(file);

    const result = await Tesseract.recognize(canvas, "eng", {
      logger: m => {
        if (m.status === "recognizing text") {
          const percent = Math.round((m.progress || 0) * 100);
          setMessage(`Texterkennung läuft... ${percent}%`, "ok");
        }
      }
    });

    const text = result.data.text || "";
    console.log("OCR Text:", text);

    const orderNumber = extractOrderNumber(text);

    if (!orderNumber) {
      setMessage("Keine Auftragsnummer hinter V oder I erkannt.", "error");
      return;
    }

    els.orderInput.value = orderNumber;
    setMessage(`Erkannt: ${orderNumber}. Bitte prüfen und speichern.`, "ok");

  } catch (err) {
    console.error(err);
    setMessage("Auftragsschein konnte nicht gelesen werden.", "error");
  }
}

async function startScanner() {
  if (!selectedSlot) {
    setMessage("Bitte zuerst einen Lagerplatz auswählen.", "error");
    return;
  }

  if (!window.Html5Qrcode) {
    setMessage("Scanner-Bibliothek wurde nicht geladen.", "error");
    return;
  }

  els.scannerWrap.classList.remove("hidden");

  try {
    html5QrCode = new Html5Qrcode("reader");

    await html5QrCode.start(
      { facingMode: "environment" },
      { fps: 10, qrbox: { width: 250, height: 160 } },
      async decodedText => {
        els.orderInput.value = decodedText;
        await stopScanner();
        await saveSelected(decodedText);
      },
      () => {}
    );
  } catch (err) {
    console.error(err);
    setMessage("Kamera konnte nicht gestartet werden. Manuelle Eingabe ist möglich.", "error");
  }
}

async function stopScanner() {
  if (html5QrCode) {
    try {
      await html5QrCode.stop();
      await html5QrCode.clear();
    } catch (e) {}
  }

  html5QrCode = null;
  els.scannerWrap.classList.add("hidden");
}

async function loadFromFirestore() {
  try {
    const snapshot = await db.collection("lager").get();

    changedValues.clear();

    snapshot.forEach(doc => {
      const data = doc.data();
      const slot = MAPPING.find(s => s.id === doc.id);

      if (slot) {
        changedValues.set(key(slot), data.value || "");
      }
    });

    saveLocalDraft();
    renderWarehouse();
    setMessage("Firebase-Daten geladen.", "ok");
  } catch (err) {
    console.error(err);
    setMessage("Firebase-Daten konnten nicht geladen werden.", "error");
  }
}

async function saveSlotToFirestore(slot, value) {
  try {
    await db.collection("lager").doc(slot.id).set({
      id: slot.id,
      label: slot.label,
      sheet: slot.sheet,
      cell: slot.cell,
      value: value || "",
      updatedAt: new Date().toISOString()
    });

    setMessage("Online gespeichert.", "ok");
  } catch (err) {
    console.error(err);
    setMessage("Online-Speichern fehlgeschlagen.", "error");
  }
}
let liveOcrStream = null;
let liveOcrTimer = null;
let liveOcrRunning = false;

async function startLiveOcr() {
  if (!selectedSlot) {
    setMessage("Bitte zuerst einen Lagerplatz auswählen.", "error");
    return;
  }

  if (!window.Tesseract) {
    setMessage("OCR-Bibliothek wurde nicht geladen.", "error");
    return;
  }

  try {
    liveOcrStream = await navigator.mediaDevices.getUserMedia({
      video: {
        facingMode: "environment"
      },
      audio: false
    });

    els.liveOcrVideo.srcObject = liveOcrStream;
    els.liveOcrWrap.classList.remove("hidden");
    els.liveOcrBtn.disabled = true;
    els.stopLiveOcrBtn.disabled = false;

    liveOcrRunning = true;

    setMessage("Live-OCR läuft. Auftragsschein vor die Kamera halten.", "ok");

    liveOcrTimer = setInterval(captureAndReadOcrFrame, 1800);

  } catch (err) {
    console.error(err);
    setMessage("Kamera konnte nicht gestartet werden.", "error");
  }
}

async function captureAndReadOcrFrame() {
  if (!liveOcrRunning) return;

  const video = els.liveOcrVideo;
  const canvas = els.liveOcrCanvas;

  if (!video.videoWidth || !video.videoHeight) return;

  const ctx = canvas.getContext("2d");

  const cropX = 0;
  const cropY = 0;
  const cropW = video.videoWidth;
  const cropH = Math.floor(video.videoHeight * 0.45);

  canvas.width = cropW;
  canvas.height = cropH;

  ctx.drawImage(video, cropX, cropY, cropW, cropH, 0, 0, cropW, cropH);

  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const data = imageData.data;

  for (let i = 0; i < data.length; i += 4) {
    const gray = data[i] * 0.3 + data[i + 1] * 0.59 + data[i + 2] * 0.11;
    const value = gray > 150 ? 255 : 0;

    data[i] = value;
    data[i + 1] = value;
    data[i + 2] = value;
  }

  ctx.putImageData(imageData, 0, 0);

  try {
    const result = await Tesseract.recognize(canvas, "eng");
    const text = result.data.text || "";

    console.log("Live OCR:", text);

    const orderNumber = extractOrderNumber(text);

    if (orderNumber) {
      els.orderInput.value = orderNumber;
      setMessage(`Erkannt: ${orderNumber}. Bitte prüfen und speichern.`, "ok");
      await stopLiveOcr();
    }

  } catch (err) {
    console.error(err);
  }
}

async function stopLiveOcr() {
  liveOcrRunning = false;

  if (liveOcrTimer) {
    clearInterval(liveOcrTimer);
    liveOcrTimer = null;
  }

  if (liveOcrStream) {
    liveOcrStream.getTracks().forEach(track => track.stop());
    liveOcrStream = null;
  }

  els.liveOcrVideo.srcObject = null;
  els.liveOcrWrap.classList.add("hidden");

  els.liveOcrBtn.disabled = !selectedSlot;
  els.stopLiveOcrBtn.disabled = true;
}

els.fileInput.addEventListener("change", e => handleFile(e.target.files[0]));
els.downloadBtn.addEventListener("click", downloadExcel);

els.loadJsonBtn.addEventListener("click", () => els.jsonInput.click());
els.jsonInput.addEventListener("change", e => importJsonData(e.target.files[0]));
els.saveJsonBtn.addEventListener("click", exportJsonData);

els.clearChangesBtn.addEventListener("click", () => {
  changedValues.clear();
  localStorage.removeItem("lagerplanungDraft");
  renderWarehouse();
  setMessage("Lokale Daten zurückgesetzt. Firebase bleibt unverändert.", "ok");
});

els.saveBtn.addEventListener("click", () => saveSelected());

els.emptyBtn.addEventListener("click", () => {
  els.orderInput.value = "";
  saveSelected("");
});
els.liveOcrBtn.addEventListener("click", startLiveOcr);
els.stopLiveOcrBtn.addEventListener("click", stopLiveOcr);

els.ocrBtn.addEventListener("click", () => {
  if (!selectedSlot) {
    setMessage("Bitte zuerst einen Lagerplatz auswählen.", "error");
    return;
  }

  els.ocrImageInput.click();
});

els.ocrImageInput.addEventListener("change", e => {
  scanOrderNumberWithOcr(e.target.files[0]);
  e.target.value = "";
});

els.scanBtn.addEventListener("click", startScanner);
els.stopScanBtn.addEventListener("click", stopScanner);

els.orderInput.addEventListener("keydown", e => {
  if (e.key === "Enter") saveSelected();
});

els.searchBtn.addEventListener("click", searchSlot);
els.searchInput.addEventListener("keydown", e => {
  if (e.key === "Enter") searchSlot();
});

els.findFreeBtn.addEventListener("click", findFreeSlot);

els.outSearchBtn.addEventListener("click", findOutgoingOrder);
els.outInput.addEventListener("keydown", e => {
  if (e.key === "Enter") findOutgoingOrder();
});

els.outClearBtn.addEventListener("click", clearFoundOutgoingSlot);
els.toggleDarkBtn.addEventListener("click", toggleDarkMode);

if (localStorage.getItem("darkMode") === "1") {
  document.body.classList.add("dark");
}

loadLocalDraft();

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("service-worker.js").catch(console.warn);
  });
}

renderWarehouse();
loadFromFirestore();
