/*
  Korrigierte Zellzuordnung passend zur hochgeladenen Excel-Datei.

  Blattnamen:
  - Regal und Feld 1
  - Regal und Feld 2
  - Regal und Feld 3
  - Regal und Feld 4

  Besonderheit:
  Regal und Feld 4 besteht in der Excel nur aus dem breiten oberen Regalblock.
*/

const AREAS = ["Regal und Feld 1", "Regal und Feld 2", "Regal und Feld 3", "Regal und Feld 4"];

function colName(colIdx) {
  let name = "";
  let n = colIdx + 1;
  while (n > 0) {
    const r = (n - 1) % 26;
    name = String.fromCharCode(65 + r) + name;
    n = Math.floor((n - 1) / 26);
  }
  return name;
}

function generateMapping() {
  const mapping = [];

  // Regal/Feld 1 bis 3 exakt nach Excel
  for (let areaNum = 1; areaNum <= 3; areaNum++) {
    const areaName = `Regal und Feld ${areaNum}`;

    // Links: A-C, Zeilen 8-13
    for (let rowIdx = 0; rowIdx < 6; rowIdx++) {
      ["A", "B", "C"].forEach((col, colIdx) => {
        const bases = [18, 12, 6];
        const i = bases[colIdx] - rowIdx;
        mapping.push({ id:`R${areaNum}.1.${i}`, label:`R${areaNum}.1.${i}`, sheet:areaName, cell:`${col}${8+rowIdx}`, area:areaName, block:"left" });
      });
    }

    // Oben: E-J, Zeilen 5-7
    for (let rowOffset = 0; rowOffset < 3; rowOffset++) {
      const row = 5 + rowOffset;
      const base = 13 - rowOffset * 6;
      for (let colOffset = 0; colOffset < 6; colOffset++) {
        const i = base + colOffset;
        mapping.push({ id:`R${areaNum}.2.${i}`, label:`R${areaNum}.2.${i}`, sheet:areaName, cell:`${colName(4+colOffset)}${row}`, area:areaName, block:"top" });
      }
    }

    // Rechts: L-N, Zeilen 8-13
    for (let rowIdx = 0; rowIdx < 6; rowIdx++) {
      ["L", "M", "N"].forEach((col, colIdx) => {
        const bases = [6, 12, 18];
        const i = bases[colIdx] - rowIdx;
        mapping.push({ id:`R${areaNum}.3.${i}`, label:`R${areaNum}.3.${i}`, sheet:areaName, cell:`${col}${8+rowIdx}`, area:areaName, block:"right" });
      });
    }

    // Mitte: D,F,H,J, Zeilen 8,10,12,14
    const midCols = ["D", "F", "H", "J"];
    const midRows = [8, 10, 12, 14];
    let fieldIdx = 1;
    midCols.forEach((col) => {
      midRows.forEach((row) => {
        mapping.push({ id:`F${areaNum}.${fieldIdx}`, label:`F${areaNum}.${fieldIdx}`, sheet:areaName, cell:`${col}${row}`, area:areaName, block:"middle" });
        fieldIdx++;
      });
    });
  }

  // Regal/Feld 4: nur breiter oberer Block, E-P, Zeilen 5-7
  // Die Excel enthält hier aktuell Bezeichnungen R3.2.x. Diese werden bewusst exakt übernommen.
  const area4 = "Regal und Feld 4";
  const rowStarts = [24, 13, 1];
  [5, 6, 7].forEach((row, rowIndex) => {
    const start = rowStarts[rowIndex];
    for (let colOffset = 0; colOffset < 12; colOffset++) {
      const label = `R3.2.${start + colOffset}`;
      mapping.push({ id:`RF4_${label}_${row}_${colOffset}`, label, sheet:area4, cell:`${colName(4+colOffset)}${row}`, area:area4, block:"topWide" });
    }
  });

  return mapping;
}

const MAPPING = generateMapping();
