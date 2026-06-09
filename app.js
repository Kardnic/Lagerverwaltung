let workbook = null;
let originalFileName = "Lagerplanung.xlsx";
let selectedSlot = null;
let html5QrCode = null;
const changedValues = new Map();

const els = {
  fileInput: document.getElementById("fileInput"),
  fileStatus: document.getElementById("fileStatus"),
  downloadBtn: document.getElementById("downloadBtn"),
  clearChangesBtn: document.getElementById("clearChangesBtn"),
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
  warehouse: document.getElementById("warehouse")
};

function setMessage(text, type = "") {
  els.message.textContent = text;
  els.message.className = `message ${type}`;
}

function key(slot) { return `${slot.sheet}!${slot.cell}`; }

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
    if (!workbook.SheetNames.includes(sheetName)) workbook.SheetNames.push(sheetName);
  }
  XLSX.utils.sheet_add_aoa(sheet, [[value]], { origin: cellAddress });
  return true;
}

function displayValue(slot) {
  if (changedValues.has(key(slot))) return changedValues.get(key(slot));
  const val = getCellValue(slot.sheet, slot.cell);
  // Wenn in der Excel noch die Lagerplatzbezeichnung steht, gilt der Platz als frei.
  if (val === slot.label) return "";
  return val;
}

function occupied(slot) {
  return displayValue(slot).trim() !== "";
}

function slots(area, block) {
  return MAPPING.filter(s => s.area === area && s.block === block);
}

function sortSlots(list) {
  return [...list].sort((a,b) => {
    const ca = XLSX.utils.decode_cell(a.cell);
    const cb = XLSX.utils.decode_cell(b.cell);
    if (ca.r !== cb.r) return ca.r - cb.r;
    return ca.c - cb.c;
  });
}

function createSlot(slot) {
  const btn = document.createElement("button");
  btn.type = "button";
  btn.className = "slot";
  const val = displayValue(slot);

  if (selectedSlot && selectedSlot.id === slot.id) btn.classList.add("selected");
  else if (changedValues.has(key(slot))) btn.classList.add("changed");
  else if (occupied(slot)) btn.classList.add("occupied");
  else btn.classList.add("free");

  btn.innerHTML = `<div class="slot-label">${slot.label}</div><div class="slot-value">${val || "frei"}</div>`;
  btn.addEventListener("click", () => selectSlot(slot));
  return btn;
}

function createBlock(title, blockClass, slotList, gridClass) {
  const block = document.createElement("div");
  block.className = `block block-${blockClass}`;
  const titleEl = document.createElement("div");
  titleEl.className = "block-title";
  titleEl.textContent = title;
  const grid = document.createElement("div");
  grid.className = gridClass;
  sortSlots(slotList).forEach(s => grid.appendChild(createSlot(s)));
  block.appendChild(titleEl);
  block.appendChild(grid);
  return block;
}

function renderWarehouse() {
  els.warehouse.innerHTML = "";
  AREAS.forEach(area => {
    const sec = document.createElement("section");
    sec.className = "area";
    const title = document.createElement("h2");
    title.className = "area-title";
    title.textContent = area;
    const layout = document.createElement("div");

    if (area === "Regal und Feld 4") {
      layout.className = "area-layout area4";
      layout.appendChild(createBlock("Regal oben", "top", slots(area, "topWide"), "grid-top-wide"));
    } else {
      layout.className = "area-layout";
      layout.appendChild(createBlock("Regal oben", "top", slots(area, "top"), "grid-top"));
      layout.appendChild(createBlock("Regal links", "left", slots(area, "left"), "grid-side"));
      layout.appendChild(createBlock("Feld Mitte", "middle", slots(area, "middle"), "grid-middle"));
      layout.appendChild(createBlock("Regal rechts", "right", slots(area, "right"), "grid-side"));
    }

    sec.appendChild(title);
    sec.appendChild(layout);
    els.warehouse.appendChild(sec);
  });
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
  setMessage(`Lagerplatz ${slot.label} ausgewählt.`, "ok");
  renderWarehouse();
}

function saveSelected(valueOverride = null) {
  if (!selectedSlot) return setMessage("Bitte zuerst einen Lagerplatz auswählen.", "error");
  const value = valueOverride !== null ? valueOverride : els.orderInput.value.trim();

  if (!workbook) {
    changedValues.set(key(selectedSlot), value);
    setMessage("Wert vorgemerkt. Zum Schreiben bitte Excel laden.", "ok");
    renderWarehouse();
    return;
  }

  setCellValue(selectedSlot.sheet, selectedSlot.cell, value);
  changedValues.set(key(selectedSlot), value);
  els.currentValue.textContent = value || "-";
  els.downloadBtn.disabled = false;
  els.clearChangesBtn.disabled = false;
  setMessage(`Übernommen: ${selectedSlot.label} = ${value || "leer"}`, "ok");
  renderWarehouse();
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
  if (!workbook) return setMessage("Keine Excel-Datei geladen.", "error");
  const out = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
  const blob = new Blob([out], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = originalFileName.replace(/\.(xlsx|xls)$/i, "") + "_aktualisiert.xlsx";
  document.body.appendChild(a);
  a.click();
  a.remove();
  setMessage("Aktualisierte Excel-Datei wurde erstellt.", "ok");
}

async function startScanner() {
  if (!selectedSlot) return setMessage("Bitte zuerst einen Lagerplatz auswählen.", "error");
  if (!window.Html5Qrcode) return setMessage("Scanner-Bibliothek wurde nicht geladen.", "error");
  els.scannerWrap.classList.remove("hidden");
  try {
    html5QrCode = new Html5Qrcode("reader");
    await html5QrCode.start(
      { facingMode: "environment" },
      { fps: 10, qrbox: { width: 250, height: 160 } },
      async decodedText => {
        els.orderInput.value = decodedText;
        await stopScanner();
        saveSelected(decodedText);
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
    try { await html5QrCode.stop(); await html5QrCode.clear(); } catch(e) {}
  }
  html5QrCode = null;
  els.scannerWrap.classList.add("hidden");
}

els.fileInput.addEventListener("change", e => handleFile(e.target.files[0]));
els.downloadBtn.addEventListener("click", downloadExcel);
els.clearChangesBtn.addEventListener("click", () => { changedValues.clear(); renderWarehouse(); });
els.saveBtn.addEventListener("click", () => saveSelected());
els.emptyBtn.addEventListener("click", () => { els.orderInput.value = ""; saveSelected(""); });
els.scanBtn.addEventListener("click", startScanner);
els.stopScanBtn.addEventListener("click", stopScanner);
els.orderInput.addEventListener("keydown", e => { if (e.key === "Enter") saveSelected(); });

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => navigator.serviceWorker.register("service-worker.js").catch(console.warn));
}

renderWarehouse();
