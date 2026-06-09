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
  if (!val) return "";
  return String(val).trim() === String(slot.label).trim() ? "" : String(val);
}

function occupied(slot) { return displayValue(slot).trim() !== ""; }

function createSlot(slot, minRow, minCol) {
  const btn = document.createElement("button");
  btn.type = "button";
  btn.className = "slot";
  const val = displayValue(slot);
  if (selectedSlot && selectedSlot.id === slot.id) btn.classList.add("selected");
  else if (changedValues.has(key(slot))) btn.classList.add("changed");
  else if (occupied(slot)) btn.classList.add("occupied");
  else btn.classList.add("free");

  btn.style.gridColumn = String(slot.col - minCol + 2);
  btn.style.gridRow = String(slot.row - minRow + 2);
  btn.innerHTML = `<div class="slot-label">${escapeHtml(slot.label)}</div><div class="slot-value">${escapeHtml(val || "frei")}</div>`;
  btn.addEventListener("click", () => selectSlot(slot));
  return btn;
}

function escapeHtml(str) {
  return String(str).replace(/[&<>'"]/g, c => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;"
  }[c]));
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

    const title = document.createElement("h2");
    title.className = "area-title";
    title.textContent = area;

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
  setMessage(`Lagerplatz ${slot.label} (${slot.cell}) ausgewählt.`, "ok");
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
  setMessage(`Übernommen: ${selectedSlot.label} / ${selectedSlot.cell} = ${value || "leer"}`, "ok");
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
els.clearChangesBtn.addEventListener("click", () => { changedValues.clear(); renderWarehouse(); setMessage("Markierungen zurückgesetzt.", "ok"); });
els.saveBtn.addEventListener("click", () => saveSelected());
els.emptyBtn.addEventListener("click", () => { els.orderInput.value = ""; saveSelected(""); });
els.scanBtn.addEventListener("click", startScanner);
els.stopScanBtn.addEventListener("click", stopScanner);
els.orderInput.addEventListener("keydown", e => { if (e.key === "Enter") saveSelected(); });

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => navigator.serviceWorker.register("service-worker.js").catch(console.warn));
}

renderWarehouse();
