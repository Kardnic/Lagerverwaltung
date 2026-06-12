let selectedSlot = null;
let lastFoundSlot = null;
let liveOcrStream = null;
let liveOcrTimer = null;
let liveOcrRunning = false;

const changedValues = new Map();
const collapsedAreas = new Set(JSON.parse(localStorage.getItem("collapsedAreas") || "[]"));

const els = {
  selectedSlot: document.getElementById("selectedSlot"),
  selectedCell: document.getElementById("selectedCell"),
  currentValue: document.getElementById("currentValue"),
  orderInput: document.getElementById("orderInput"),

  liveOcrBtn: document.getElementById("liveOcrBtn"),
  stopLiveOcrBtn: document.getElementById("stopLiveOcrBtn"),
  liveOcrWrap: document.getElementById("liveOcrWrap"),
  liveOcrVideo: document.getElementById("liveOcrVideo"),
  liveOcrCanvas: document.getElementById("liveOcrCanvas"),

  saveBtn: document.getElementById("saveBtn"),
  emptyBtn: document.getElementById("emptyBtn"),

  message: document.getElementById("message"),
  warehouse: document.getElementById("warehouse"),
  statsBox: document.getElementById("statsBox"),

  searchInput: document.getElementById("searchInput"),
  searchBtn: document.getElementById("searchBtn"),
  findFreeBtn: document.getElementById("findFreeBtn"),

  outInput: document.getElementById("outInput"),
  outSearchBtn: document.getElementById("outSearchBtn"),
  outClearBtn: document.getElementById("outClearBtn"),

  toggleDarkBtn: document.getElementById("toggleDarkBtn")
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

function displayValue(slot) {
  if (changedValues.has(key(slot))) {
    return changedValues.get(key(slot));
  }

  return "";
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

  const value = displayValue(slot);

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
    <div class="slot-value">${esc(value || "frei")}</div>
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

    areaSlots.forEach(slot => {
      grid.appendChild(createSlot(slot, minRow, minCol));
    });

    sec.appendChild(title);
    sec.appendChild(grid);
    els.warehouse.appendChild(sec);
  });

  updateStats();
}

function selectSlot(slot) {
  selectedSlot = slot;

  const value = displayValue(slot);

  els.selectedSlot.textContent = slot.label;
  els.selectedCell.textContent = `${slot.sheet} / ${slot.cell}`;
  els.currentValue.textContent = value || "-";
  els.orderInput.value = value || "";

  els.liveOcrBtn.disabled = false;
  els.saveBtn.disabled = false;
  els.emptyBtn.disabled = false;

  setMessage(`Lagerplatz ${slot.label} ausgewählt.`, "ok");

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

  changedValues.set(key(selectedSlot), value);
  saveLocalDraft();

  els.currentValue.textContent = value || "-";

  renderWarehouse();

  await saveSlotToFirestore(selectedSlot, value);
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

function startRealtimeSync() {
  db.collection("lager").onSnapshot(snapshot => {
    snapshot.docChanges().forEach(change => {
      const data = change.doc.data();
      const slot = MAPPING.find(s => s.id === change.doc.id);

      if (!slot) return;

      if (change.type === "removed") {
        changedValues.delete(key(slot));
      } else {
        changedValues.set(key(slot), data.value || "");
      }
    });

    saveLocalDraft();
    renderWarehouse();
  });
}

function findSlotByValueOrLabel(query) {
  const q = String(query || "").trim().toLowerCase();
  if (!q) return null;

  return MAPPING.find(slot => {
    const label = String(slot.label || "").toLowerCase();
    const value = String(displayValue(slot) || "").toLowerCase();

    return (
      label === q ||
      value === q ||
      label.includes(q) ||
      value.includes(q)
    );
  }) || null;
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

function toggleDarkMode() {
  document.body.classList.toggle("dark");
  localStorage.setItem("darkMode", document.body.classList.contains("dark") ? "1" : "0");
}

function extractOrderNumber(text) {
  const clean = String(text || "")
    .replace(/\s+/g, " ")
    .replace(/O/g, "0")
    .replace(/o/g, "0")
    .replace(/\|/g, "I")
    .trim();

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

els.saveBtn.addEventListener("click", () => saveSelected());

els.emptyBtn.addEventListener("click", () => {
  els.orderInput.value = "";
  saveSelected("");
});

els.orderInput.addEventListener("keydown", e => {
  if (e.key === "Enter") saveSelected();
});

els.liveOcrBtn.addEventListener("click", startLiveOcr);
els.stopLiveOcrBtn.addEventListener("click", stopLiveOcr);

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
startRealtimeSync();
