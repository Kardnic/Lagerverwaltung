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
const extraEls = {
  statsBox: document.getElementById("statsBox"),
  searchInput: document.getElementById("searchInput"),
  searchBtn: document.getElementById("searchBtn"),
  findFreeBtn: document.getElementById("findFreeBtn"),
  outInput: document.getElementById("outInput"),
  outSearchBtn: document.getElementById("outSearchBtn"),
  outClearBtn: document.getElementById("outClearBtn"),
  toggleDarkBtn: document.getElementById("toggleDarkBtn")
};

let lastFoundSlot = null;
const collapsedAreas = new Set(JSON.parse(localStorage.getItem("collapsedAreas") || "[]"));

function saveLocalDraft(){
  const data = Array.from(changedValues.entries());
  localStorage.setItem("lagerplanungDraft", JSON.stringify(data));
}

function loadLocalDraft(){
  try{
    const data = JSON.parse(localStorage.getItem("lagerplanungDraft") || "[]");
    changedValues.clear();
    data.forEach(([k,v]) => changedValues.set(k,v));
  }catch(e){}
}

function saveUiState(){
  localStorage.setItem("collapsedAreas", JSON.stringify(Array.from(collapsedAreas)));
}

function findSlotByValueOrLabel(query){
  const q = String(query || "").trim().toLowerCase();
  if(!q) return null;

  return MAPPING.find(slot => {
    const label = String(slot.label || "").toLowerCase();
    const value = String(displayValue(slot) || "").toLowerCase();
    return label === q || value === q || label.includes(q) || value.includes(q);
  }) || null;
}

function scrollToSelected(){
  setTimeout(() => {
    const selected = document.querySelector(".slot.selected");
    if(selected){
      selected.scrollIntoView({behavior:"smooth", block:"center", inline:"center"});
    }
  }, 100);
}

function updateStats(){
  if(!extraEls.statsBox) return;

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

  html = `
    <div class="stat-card">
      Gesamt
      <small>${occupiedAll} / ${totalAll} belegt · ${percentAll}%</small>
    </div>
  ` + html;

  extraEls.statsBox.innerHTML = html;
}

const oldRenderWarehouse = renderWarehouse;

renderWarehouse = function(){
  oldRenderWarehouse();

  document.querySelectorAll(".area").forEach(areaEl => {
    const title = areaEl.querySelector(".area-title");
    if(!title) return;

    const areaName = title.textContent.trim().replace("▼","").replace("▶","").trim();

    if(collapsedAreas.has(areaName)){
      areaEl.classList.add("collapsed");
    }

    title.onclick = () => {
      if(collapsedAreas.has(areaName)){
        collapsedAreas.delete(areaName);
        areaEl.classList.remove("collapsed");
      }else{
        collapsedAreas.add(areaName);
        areaEl.classList.add("collapsed");
      }
      saveUiState();
    };
  });

  updateStats();
};

const oldSaveSelected = saveSelected;

saveSelected = function(valueOverride = null){
  oldSaveSelected(valueOverride);
  saveLocalDraft();
  updateStats();
};

const oldSelectSlot = selectSlot;

selectSlot = function(slot){
  oldSelectSlot(slot);
  scrollToSelected();
};

function searchSlot(){
  const slot = findSlotByValueOrLabel(extraEls.searchInput.value);

  if(!slot){
    setMessage("Kein Lagerplatz oder Auftrag gefunden.", "error");
    return;
  }

  if(collapsedAreas.has(slot.area)){
    collapsedAreas.delete(slot.area);
    saveUiState();
  }

  selectSlot(slot);
  setMessage(`Gefunden: ${slot.label} in ${slot.area}`, "ok");
}

function findFreeSlot(){
  const slot = MAPPING.find(s => !occupied(s));

  if(!slot){
    setMessage("Kein freier Lagerplatz gefunden.", "error");
    return;
  }

  if(collapsedAreas.has(slot.area)){
    collapsedAreas.delete(slot.area);
    saveUiState();
  }

  selectSlot(slot);
  setMessage(`Nächster freier Platz: ${slot.label}`, "ok");
}

function findOutgoingOrder(){
  const slot = findSlotByValueOrLabel(extraEls.outInput.value);

  if(!slot){
    lastFoundSlot = null;
    setMessage("Auftrag wurde nicht gefunden.", "error");
    return;
  }

  lastFoundSlot = slot;

  if(collapsedAreas.has(slot.area)){
    collapsedAreas.delete(slot.area);
    saveUiState();
  }

  selectSlot(slot);
  setMessage(`Auftrag gefunden: ${displayValue(slot)} liegt auf ${slot.label}`, "ok");
}

function clearFoundOutgoingSlot(){
  if(!lastFoundSlot && selectedSlot){
    lastFoundSlot = selectedSlot;
  }

  if(!lastFoundSlot){
    setMessage("Erst einen Auftrag suchen.", "error");
    return;
  }

  selectedSlot = lastFoundSlot;
  els.orderInput.value = "";
  saveSelected("");
  setMessage(`Platz geleert: ${lastFoundSlot.label}`, "ok");
  lastFoundSlot = null;
}

function toggleDarkMode(){
  document.body.classList.toggle("dark");
  localStorage.setItem("darkMode", document.body.classList.contains("dark") ? "1" : "0");
}

if(localStorage.getItem("darkMode") === "1"){
  document.body.classList.add("dark");
}

loadLocalDraft();
function exportJsonData() {
  const data = {};

  MAPPING.forEach(slot => {
    const value = displayValue(slot);
    if (value && value.trim() !== "") {
      data[slot.id] = {
        label: slot.label,
        sheet: slot.sheet,
        cell: slot.cell,
        value: value
      };
    }
  });

  const blob = new Blob([JSON.stringify(data, null, 2)], {
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
      const data = JSON.parse(e.target.result);

      Object.values(data).forEach(entry => {
        const slot = MAPPING.find(s =>
          s.id === entry.id ||
          s.label === entry.label ||
          s.cell === entry.cell
        );

        if (slot) {
          changedValues.set(key(slot), entry.value || "");
        }
      });

      localStorage.setItem("lagerplanungDraft", JSON.stringify(Array.from(changedValues.entries())));

      renderWarehouse();
      if (typeof updateStats === "function") updateStats();

      setMessage("JSON-Daten wurden geladen.", "ok");
    } catch (err) {
      console.error(err);
      setMessage("JSON-Datei konnte nicht gelesen werden.", "error");
    }
  };

  reader.readAsText(file);
}
if(extraEls.searchBtn) extraEls.searchBtn.addEventListener("click", searchSlot);
if(extraEls.searchInput) extraEls.searchInput.addEventListener("keydown", e => {
  if(e.key === "Enter") searchSlot();
});

if(extraEls.findFreeBtn) extraEls.findFreeBtn.addEventListener("click", findFreeSlot);

if(extraEls.outSearchBtn) extraEls.outSearchBtn.addEventListener("click", findOutgoingOrder);
if(extraEls.outInput) extraEls.outInput.addEventListener("keydown", e => {
  if(e.key === "Enter") findOutgoingOrder();
});

if(extraEls.outClearBtn) extraEls.outClearBtn.addEventListener("click", clearFoundOutgoingSlot);

if(extraEls.toggleDarkBtn) extraEls.toggleDarkBtn.addEventListener("click", toggleDarkMode);
renderWarehouse();
