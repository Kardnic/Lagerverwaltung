const AREAS = [
  "Regal und Feld 1",
  "Regal und Feld 2",
  "Regal und Feld 3",
  "Regal und Feld 4"
];

const MAPPING = [
  {
    "id": "Regal und Feld 1!E5",
    "label": "R1.2.13",
    "sheet": "Regal und Feld 1",
    "cell": "E5",
    "area": "Regal und Feld 1",
    "block": "top",
    "row": 5,
    "col": 5
  },
  {
    "id": "Regal und Feld 1!F5",
    "label": "R1.2.14",
    "sheet": "Regal und Feld 1",
    "cell": "F5",
    "area": "Regal und Feld 1",
    "block": "top",
    "row": 5,
    "col": 6
  },
  {
    "id": "Regal und Feld 1!G5",
    "label": "R1.2.15",
    "sheet": "Regal und Feld 1",
    "cell": "G5",
    "area": "Regal und Feld 1",
    "block": "top",
    "row": 5,
    "col": 7
  },
  {
    "id": "Regal und Feld 1!H5",
    "label": "R1.2.16",
    "sheet": "Regal und Feld 1",
    "cell": "H5",
    "area": "Regal und Feld 1",
    "block": "top",
    "row": 5,
    "col": 8
  },
  {
    "id": "Regal und Feld 1!I5",
    "label": "R1.2.17",
    "sheet": "Regal und Feld 1",
    "cell": "I5",
    "area": "Regal und Feld 1",
    "block": "top",
    "row": 5,
    "col": 9
  },
  {
    "id": "Regal und Feld 1!J5",
    "label": "R1.2.18",
    "sheet": "Regal und Feld 1",
    "cell": "J5",
    "area": "Regal und Feld 1",
    "block": "top",
    "row": 5,
    "col": 10
  },
  {
    "id": "Regal und Feld 1!E6",
    "label": "R1.2.7",
    "sheet": "Regal und Feld 1",
    "cell": "E6",
    "area": "Regal und Feld 1",
    "block": "top",
    "row": 6,
    "col": 5
  },
  {
    "id": "Regal und Feld 1!F6",
    "label": "R1.2.8",
    "sheet": "Regal und Feld 1",
    "cell": "F6",
    "area": "Regal und Feld 1",
    "block": "top",
    "row": 6,
    "col": 6
  },
  {
    "id": "Regal und Feld 1!G6",
    "label": "R1.2.9",
    "sheet": "Regal und Feld 1",
    "cell": "G6",
    "area": "Regal und Feld 1",
    "block": "top",
    "row": 6,
    "col": 7
  },
  {
    "id": "Regal und Feld 1!H6",
    "label": "R1.2.10",
    "sheet": "Regal und Feld 1",
    "cell": "H6",
    "area": "Regal und Feld 1",
    "block": "top",
    "row": 6,
    "col": 8
  },
  {
    "id": "Regal und Feld 1!I6",
    "label": "R1.2.11",
    "sheet": "Regal und Feld 1",
    "cell": "I6",
    "area": "Regal und Feld 1",
    "block": "top",
    "row": 6,
    "col": 9
  },
  {
    "id": "Regal und Feld 1!J6",
    "label": "R1.2.12",
    "sheet": "Regal und Feld 1",
    "cell": "J6",
    "area": "Regal und Feld 1",
    "block": "top",
    "row": 6,
    "col": 10
  },
  {
    "id": "Regal und Feld 1!E7",
    "label": "R1.2.1",
    "sheet": "Regal und Feld 1",
    "cell": "E7",
    "area": "Regal und Feld 1",
    "block": "top",
    "row": 7,
    "col": 5
  },
  {
    "id": "Regal und Feld 1!F7",
    "label": "R1.2.2",
    "sheet": "Regal und Feld 1",
    "cell": "F7",
    "area": "Regal und Feld 1",
    "block": "top",
    "row": 7,
    "col": 6
  },
  {
    "id": "Regal und Feld 1!G7",
    "label": "R1.2.3",
    "sheet": "Regal und Feld 1",
    "cell": "G7",
    "area": "Regal und Feld 1",
    "block": "top",
    "row": 7,
    "col": 7
  },
  {
    "id": "Regal und Feld 1!H7",
    "label": "R1.2.4",
    "sheet": "Regal und Feld 1",
    "cell": "H7",
    "area": "Regal und Feld 1",
    "block": "top",
    "row": 7,
    "col": 8
  },
  {
    "id": "Regal und Feld 1!I7",
    "label": "R1.2.5",
    "sheet": "Regal und Feld 1",
    "cell": "I7",
    "area": "Regal und Feld 1",
    "block": "top",
    "row": 7,
    "col": 9
  },
  {
    "id": "Regal und Feld 1!J7",
    "label": "R1.2.6",
    "sheet": "Regal und Feld 1",
    "cell": "J7",
    "area": "Regal und Feld 1",
    "block": "top",
    "row": 7,
    "col": 10
  },
  {
    "id": "Regal und Feld 1!B8",
    "label": "F1.1",
    "sheet": "Regal und Feld 1",
    "cell": "B8",
    "area": "Regal und Feld 1",
    "block": "middle",
    "row": 8,
    "col": 2
  },
  {
    "id": "Regal und Feld 1!D8",
    "label": "F1.5",
    "sheet": "Regal und Feld 1",
    "cell": "D8",
    "area": "Regal und Feld 1",
    "block": "middle",
    "row": 8,
    "col": 4
  },
  {
    "id": "Regal und Feld 1!F8",
    "label": "F1.9",
    "sheet": "Regal und Feld 1",
    "cell": "F8",
    "area": "Regal und Feld 1",
    "block": "middle",
    "row": 8,
    "col": 6
  },
  {
    "id": "Regal und Feld 1!H8",
    "label": "F1.13",
    "sheet": "Regal und Feld 1",
    "cell": "H8",
    "area": "Regal und Feld 1",
    "block": "middle",
    "row": 8,
    "col": 8
  },
  {
    "id": "Regal und Feld 1!J8",
    "label": "F1.17",
    "sheet": "Regal und Feld 1",
    "cell": "J8",
    "area": "Regal und Feld 1",
    "block": "middle",
    "row": 8,
    "col": 10
  },
  {
    "id": "Regal und Feld 1!L8",
    "label": "R1.3.4",
    "sheet": "Regal und Feld 1",
    "cell": "L8",
    "area": "Regal und Feld 1",
    "block": "right",
    "row": 8,
    "col": 12
  },
  {
    "id": "Regal und Feld 1!M8",
    "label": "R1.3.8",
    "sheet": "Regal und Feld 1",
    "cell": "M8",
    "area": "Regal und Feld 1",
    "block": "right",
    "row": 8,
    "col": 13
  },
  {
    "id": "Regal und Feld 1!N8",
    "label": "R1.3.12",
    "sheet": "Regal und Feld 1",
    "cell": "N8",
    "area": "Regal und Feld 1",
    "block": "right",
    "row": 8,
    "col": 14
  },
  {
    "id": "Regal und Feld 1!B10",
    "label": "F1.2",
    "sheet": "Regal und Feld 1",
    "cell": "B10",
    "area": "Regal und Feld 1",
    "block": "middle",
    "row": 10,
    "col": 2
  },
  {
    "id": "Regal und Feld 1!D10",
    "label": "F1.6",
    "sheet": "Regal und Feld 1",
    "cell": "D10",
    "area": "Regal und Feld 1",
    "block": "middle",
    "row": 10,
    "col": 4
  },
  {
    "id": "Regal und Feld 1!F10",
    "label": "F1.10",
    "sheet": "Regal und Feld 1",
    "cell": "F10",
    "area": "Regal und Feld 1",
    "block": "middle",
    "row": 10,
    "col": 6
  },
  {
    "id": "Regal und Feld 1!H10",
    "label": "F1.14",
    "sheet": "Regal und Feld 1",
    "cell": "H10",
    "area": "Regal und Feld 1",
    "block": "middle",
    "row": 10,
    "col": 8
  },
  {
    "id": "Regal und Feld 1!J10",
    "label": "F1.18",
    "sheet": "Regal und Feld 1",
    "cell": "J10",
    "area": "Regal und Feld 1",
    "block": "middle",
    "row": 10,
    "col": 10
  },
  {
    "id": "Regal und Feld 1!L10",
    "label": "R1.3.3",
    "sheet": "Regal und Feld 1",
    "cell": "L10",
    "area": "Regal und Feld 1",
    "block": "right",
    "row": 10,
    "col": 12
  },
  {
    "id": "Regal und Feld 1!M10",
    "label": "R1.3.7",
    "sheet": "Regal und Feld 1",
    "cell": "M10",
    "area": "Regal und Feld 1",
    "block": "right",
    "row": 10,
    "col": 13
  },
  {
    "id": "Regal und Feld 1!N10",
    "label": "R1.3.11",
    "sheet": "Regal und Feld 1",
    "cell": "N10",
    "area": "Regal und Feld 1",
    "block": "right",
    "row": 10,
    "col": 14
  },
  {
    "id": "Regal und Feld 1!B12",
    "label": "F1.3",
    "sheet": "Regal und Feld 1",
    "cell": "B12",
    "area": "Regal und Feld 1",
    "block": "middle",
    "row": 12,
    "col": 2
  },
  {
    "id": "Regal und Feld 1!D12",
    "label": "F1.7",
    "sheet": "Regal und Feld 1",
    "cell": "D12",
    "area": "Regal und Feld 1",
    "block": "middle",
    "row": 12,
    "col": 4
  },
  {
    "id": "Regal und Feld 1!F12",
    "label": "F1.11",
    "sheet": "Regal und Feld 1",
    "cell": "F12",
    "area": "Regal und Feld 1",
    "block": "middle",
    "row": 12,
    "col": 6
  },
  {
    "id": "Regal und Feld 1!H12",
    "label": "F1.15",
    "sheet": "Regal und Feld 1",
    "cell": "H12",
    "area": "Regal und Feld 1",
    "block": "middle",
    "row": 12,
    "col": 8
  },
  {
    "id": "Regal und Feld 1!J12",
    "label": "F1.19",
    "sheet": "Regal und Feld 1",
    "cell": "J12",
    "area": "Regal und Feld 1",
    "block": "middle",
    "row": 12,
    "col": 10
  },
  {
    "id": "Regal und Feld 1!L12",
    "label": "R1.3.2",
    "sheet": "Regal und Feld 1",
    "cell": "L12",
    "area": "Regal und Feld 1",
    "block": "right",
    "row": 12,
    "col": 12
  },
  {
    "id": "Regal und Feld 1!M12",
    "label": "R1.3.6",
    "sheet": "Regal und Feld 1",
    "cell": "M12",
    "area": "Regal und Feld 1",
    "block": "right",
    "row": 12,
    "col": 13
  },
  {
    "id": "Regal und Feld 1!N12",
    "label": "R1.3.10",
    "sheet": "Regal und Feld 1",
    "cell": "N12",
    "area": "Regal und Feld 1",
    "block": "right",
    "row": 12,
    "col": 14
  },
  {
    "id": "Regal und Feld 1!B14",
    "label": "F1.4",
    "sheet": "Regal und Feld 1",
    "cell": "B14",
    "area": "Regal und Feld 1",
    "block": "middle",
    "row": 14,
    "col": 2
  },
  {
    "id": "Regal und Feld 1!D14",
    "label": "F1.8",
    "sheet": "Regal und Feld 1",
    "cell": "D14",
    "area": "Regal und Feld 1",
    "block": "middle",
    "row": 14,
    "col": 4
  },
  {
    "id": "Regal und Feld 1!F14",
    "label": "F1.12",
    "sheet": "Regal und Feld 1",
    "cell": "F14",
    "area": "Regal und Feld 1",
    "block": "middle",
    "row": 14,
    "col": 6
  },
  {
    "id": "Regal und Feld 1!H14",
    "label": "F1.16",
    "sheet": "Regal und Feld 1",
    "cell": "H14",
    "area": "Regal und Feld 1",
    "block": "middle",
    "row": 14,
    "col": 8
  },
  {
    "id": "Regal und Feld 1!J14",
    "label": "F1.20",
    "sheet": "Regal und Feld 1",
    "cell": "J14",
    "area": "Regal und Feld 1",
    "block": "middle",
    "row": 14,
    "col": 10
  },
  {
    "id": "Regal und Feld 1!L14",
    "label": "R1.3.1",
    "sheet": "Regal und Feld 1",
    "cell": "L14",
    "area": "Regal und Feld 1",
    "block": "right",
    "row": 14,
    "col": 12
  },
  {
    "id": "Regal und Feld 1!M14",
    "label": "R1.3.5",
    "sheet": "Regal und Feld 1",
    "cell": "M14",
    "area": "Regal und Feld 1",
    "block": "right",
    "row": 14,
    "col": 13
  },
  {
    "id": "Regal und Feld 1!N14",
    "label": "R1.3.9",
    "sheet": "Regal und Feld 1",
    "cell": "N14",
    "area": "Regal und Feld 1",
    "block": "right",
    "row": 14,
    "col": 14
  },
  {
    "id": "Regal und Feld 2!I6",
    "label": "R2.2.13",
    "sheet": "Regal und Feld 2",
    "cell": "I6",
    "area": "Regal und Feld 2",
    "block": "top",
    "row": 6,
    "col": 9
  },
  {
    "id": "Regal und Feld 2!J6",
    "label": "R2.2.14",
    "sheet": "Regal und Feld 2",
    "cell": "J6",
    "area": "Regal und Feld 2",
    "block": "top",
    "row": 6,
    "col": 10
  },
  {
    "id": "Regal und Feld 2!K6",
    "label": "R2.2.15",
    "sheet": "Regal und Feld 2",
    "cell": "K6",
    "area": "Regal und Feld 2",
    "block": "top",
    "row": 6,
    "col": 11
  },
  {
    "id": "Regal und Feld 2!L6",
    "label": "R2.2.16",
    "sheet": "Regal und Feld 2",
    "cell": "L6",
    "area": "Regal und Feld 2",
    "block": "top",
    "row": 6,
    "col": 12
  },
  {
    "id": "Regal und Feld 2!M6",
    "label": "R2.2.17",
    "sheet": "Regal und Feld 2",
    "cell": "M6",
    "area": "Regal und Feld 2",
    "block": "top",
    "row": 6,
    "col": 13
  },
  {
    "id": "Regal und Feld 2!N6",
    "label": "R2.2.18",
    "sheet": "Regal und Feld 2",
    "cell": "N6",
    "area": "Regal und Feld 2",
    "block": "top",
    "row": 6,
    "col": 14
  },
  {
    "id": "Regal und Feld 2!I7",
    "label": "R2.2.7",
    "sheet": "Regal und Feld 2",
    "cell": "I7",
    "area": "Regal und Feld 2",
    "block": "top",
    "row": 7,
    "col": 9
  },
  {
    "id": "Regal und Feld 2!J7",
    "label": "R2.2.8",
    "sheet": "Regal und Feld 2",
    "cell": "J7",
    "area": "Regal und Feld 2",
    "block": "top",
    "row": 7,
    "col": 10
  },
  {
    "id": "Regal und Feld 2!K7",
    "label": "R2.2.9",
    "sheet": "Regal und Feld 2",
    "cell": "K7",
    "area": "Regal und Feld 2",
    "block": "top",
    "row": 7,
    "col": 11
  },
  {
    "id": "Regal und Feld 2!L7",
    "label": "R2.2.10",
    "sheet": "Regal und Feld 2",
    "cell": "L7",
    "area": "Regal und Feld 2",
    "block": "top",
    "row": 7,
    "col": 12
  },
  {
    "id": "Regal und Feld 2!M7",
    "label": "R2.2.11",
    "sheet": "Regal und Feld 2",
    "cell": "M7",
    "area": "Regal und Feld 2",
    "block": "top",
    "row": 7,
    "col": 13
  },
  {
    "id": "Regal und Feld 2!N7",
    "label": "R2.2.12",
    "sheet": "Regal und Feld 2",
    "cell": "N7",
    "area": "Regal und Feld 2",
    "block": "top",
    "row": 7,
    "col": 14
  },
  {
    "id": "Regal und Feld 2!I8",
    "label": "R2.2.1",
    "sheet": "Regal und Feld 2",
    "cell": "I8",
    "area": "Regal und Feld 2",
    "block": "top",
    "row": 8,
    "col": 9
  },
  {
    "id": "Regal und Feld 2!J8",
    "label": "R2.2.2",
    "sheet": "Regal und Feld 2",
    "cell": "J8",
    "area": "Regal und Feld 2",
    "block": "top",
    "row": 8,
    "col": 10
  },
  {
    "id": "Regal und Feld 2!K8",
    "label": "R2.2.3",
    "sheet": "Regal und Feld 2",
    "cell": "K8",
    "area": "Regal und Feld 2",
    "block": "top",
    "row": 8,
    "col": 11
  },
  {
    "id": "Regal und Feld 2!L8",
    "label": "R2.2.4",
    "sheet": "Regal und Feld 2",
    "cell": "L8",
    "area": "Regal und Feld 2",
    "block": "top",
    "row": 8,
    "col": 12
  },
  {
    "id": "Regal und Feld 2!M8",
    "label": "R2.2.5",
    "sheet": "Regal und Feld 2",
    "cell": "M8",
    "area": "Regal und Feld 2",
    "block": "top",
    "row": 8,
    "col": 13
  },
  {
    "id": "Regal und Feld 2!N8",
    "label": "R2.2.6",
    "sheet": "Regal und Feld 2",
    "cell": "N8",
    "area": "Regal und Feld 2",
    "block": "top",
    "row": 8,
    "col": 14
  },
  {
    "id": "Regal und Feld 2!C9",
    "label": "R2.1.4",
    "sheet": "Regal und Feld 2",
    "cell": "C9",
    "area": "Regal und Feld 2",
    "block": "left",
    "row": 9,
    "col": 3
  },
  {
    "id": "Regal und Feld 2!D9",
    "label": "R2.1.8",
    "sheet": "Regal und Feld 2",
    "cell": "D9",
    "area": "Regal und Feld 2",
    "block": "left",
    "row": 9,
    "col": 4
  },
  {
    "id": "Regal und Feld 2!E9",
    "label": "R2.1.12",
    "sheet": "Regal und Feld 2",
    "cell": "E9",
    "area": "Regal und Feld 2",
    "block": "left",
    "row": 9,
    "col": 5
  },
  {
    "id": "Regal und Feld 2!F9",
    "label": "F2.1",
    "sheet": "Regal und Feld 2",
    "cell": "F9",
    "area": "Regal und Feld 2",
    "block": "middle",
    "row": 9,
    "col": 6
  },
  {
    "id": "Regal und Feld 2!H9",
    "label": "F2.5",
    "sheet": "Regal und Feld 2",
    "cell": "H9",
    "area": "Regal und Feld 2",
    "block": "middle",
    "row": 9,
    "col": 8
  },
  {
    "id": "Regal und Feld 2!J9",
    "label": "F2.9",
    "sheet": "Regal und Feld 2",
    "cell": "J9",
    "area": "Regal und Feld 2",
    "block": "middle",
    "row": 9,
    "col": 10
  },
  {
    "id": "Regal und Feld 2!L9",
    "label": "F2.13",
    "sheet": "Regal und Feld 2",
    "cell": "L9",
    "area": "Regal und Feld 2",
    "block": "middle",
    "row": 9,
    "col": 12
  },
  {
    "id": "Regal und Feld 2!N9",
    "label": "F2.17",
    "sheet": "Regal und Feld 2",
    "cell": "N9",
    "area": "Regal und Feld 2",
    "block": "middle",
    "row": 9,
    "col": 14
  },
  {
    "id": "Regal und Feld 2!P9",
    "label": "R2.3.4",
    "sheet": "Regal und Feld 2",
    "cell": "P9",
    "area": "Regal und Feld 2",
    "block": "right",
    "row": 9,
    "col": 16
  },
  {
    "id": "Regal und Feld 2!Q9",
    "label": "R2.3.8",
    "sheet": "Regal und Feld 2",
    "cell": "Q9",
    "area": "Regal und Feld 2",
    "block": "right",
    "row": 9,
    "col": 17
  },
  {
    "id": "Regal und Feld 2!R9",
    "label": "R2.3.12",
    "sheet": "Regal und Feld 2",
    "cell": "R9",
    "area": "Regal und Feld 2",
    "block": "right",
    "row": 9,
    "col": 18
  },
  {
    "id": "Regal und Feld 2!C11",
    "label": "R2.1.3",
    "sheet": "Regal und Feld 2",
    "cell": "C11",
    "area": "Regal und Feld 2",
    "block": "left",
    "row": 11,
    "col": 3
  },
  {
    "id": "Regal und Feld 2!D11",
    "label": "R2.1.7",
    "sheet": "Regal und Feld 2",
    "cell": "D11",
    "area": "Regal und Feld 2",
    "block": "left",
    "row": 11,
    "col": 4
  },
  {
    "id": "Regal und Feld 2!E11",
    "label": "R2.1.11",
    "sheet": "Regal und Feld 2",
    "cell": "E11",
    "area": "Regal und Feld 2",
    "block": "left",
    "row": 11,
    "col": 5
  },
  {
    "id": "Regal und Feld 2!F11",
    "label": "F2.2",
    "sheet": "Regal und Feld 2",
    "cell": "F11",
    "area": "Regal und Feld 2",
    "block": "middle",
    "row": 11,
    "col": 6
  },
  {
    "id": "Regal und Feld 2!H11",
    "label": "F2.6",
    "sheet": "Regal und Feld 2",
    "cell": "H11",
    "area": "Regal und Feld 2",
    "block": "middle",
    "row": 11,
    "col": 8
  },
  {
    "id": "Regal und Feld 2!J11",
    "label": "F2.10",
    "sheet": "Regal und Feld 2",
    "cell": "J11",
    "area": "Regal und Feld 2",
    "block": "middle",
    "row": 11,
    "col": 10
  },
  {
    "id": "Regal und Feld 2!L11",
    "label": "F2.14",
    "sheet": "Regal und Feld 2",
    "cell": "L11",
    "area": "Regal und Feld 2",
    "block": "middle",
    "row": 11,
    "col": 12
  },
  {
    "id": "Regal und Feld 2!N11",
    "label": "F2.18",
    "sheet": "Regal und Feld 2",
    "cell": "N11",
    "area": "Regal und Feld 2",
    "block": "middle",
    "row": 11,
    "col": 14
  },
  {
    "id": "Regal und Feld 2!P11",
    "label": "R2.3.3",
    "sheet": "Regal und Feld 2",
    "cell": "P11",
    "area": "Regal und Feld 2",
    "block": "right",
    "row": 11,
    "col": 16
  },
  {
    "id": "Regal und Feld 2!Q11",
    "label": "R2.3.7",
    "sheet": "Regal und Feld 2",
    "cell": "Q11",
    "area": "Regal und Feld 2",
    "block": "right",
    "row": 11,
    "col": 17
  },
  {
    "id": "Regal und Feld 2!R11",
    "label": "R2.3.11",
    "sheet": "Regal und Feld 2",
    "cell": "R11",
    "area": "Regal und Feld 2",
    "block": "right",
    "row": 11,
    "col": 18
  },
  {
    "id": "Regal und Feld 2!C13",
    "label": "R2.1.2",
    "sheet": "Regal und Feld 2",
    "cell": "C13",
    "area": "Regal und Feld 2",
    "block": "left",
    "row": 13,
    "col": 3
  },
  {
    "id": "Regal und Feld 2!D13",
    "label": "R2.1.6",
    "sheet": "Regal und Feld 2",
    "cell": "D13",
    "area": "Regal und Feld 2",
    "block": "left",
    "row": 13,
    "col": 4
  },
  {
    "id": "Regal und Feld 2!E13",
    "label": "R2.1.10",
    "sheet": "Regal und Feld 2",
    "cell": "E13",
    "area": "Regal und Feld 2",
    "block": "left",
    "row": 13,
    "col": 5
  },
  {
    "id": "Regal und Feld 2!F13",
    "label": "F2.3",
    "sheet": "Regal und Feld 2",
    "cell": "F13",
    "area": "Regal und Feld 2",
    "block": "middle",
    "row": 13,
    "col": 6
  },
  {
    "id": "Regal und Feld 2!H13",
    "label": "F2.7",
    "sheet": "Regal und Feld 2",
    "cell": "H13",
    "area": "Regal und Feld 2",
    "block": "middle",
    "row": 13,
    "col": 8
  },
  {
    "id": "Regal und Feld 2!J13",
    "label": "F2.11",
    "sheet": "Regal und Feld 2",
    "cell": "J13",
    "area": "Regal und Feld 2",
    "block": "middle",
    "row": 13,
    "col": 10
  },
  {
    "id": "Regal und Feld 2!L13",
    "label": "F2.15",
    "sheet": "Regal und Feld 2",
    "cell": "L13",
    "area": "Regal und Feld 2",
    "block": "middle",
    "row": 13,
    "col": 12
  },
  {
    "id": "Regal und Feld 2!N13",
    "label": "F2.19",
    "sheet": "Regal und Feld 2",
    "cell": "N13",
    "area": "Regal und Feld 2",
    "block": "middle",
    "row": 13,
    "col": 14
  },
  {
    "id": "Regal und Feld 2!P13",
    "label": "R2.3.2",
    "sheet": "Regal und Feld 2",
    "cell": "P13",
    "area": "Regal und Feld 2",
    "block": "right",
    "row": 13,
    "col": 16
  },
  {
    "id": "Regal und Feld 2!Q13",
    "label": "R2.3.6",
    "sheet": "Regal und Feld 2",
    "cell": "Q13",
    "area": "Regal und Feld 2",
    "block": "right",
    "row": 13,
    "col": 17
  },
  {
    "id": "Regal und Feld 2!R13",
    "label": "R2.3.10",
    "sheet": "Regal und Feld 2",
    "cell": "R13",
    "area": "Regal und Feld 2",
    "block": "right",
    "row": 13,
    "col": 18
  },
  {
    "id": "Regal und Feld 2!C15",
    "label": "R2.1.1",
    "sheet": "Regal und Feld 2",
    "cell": "C15",
    "area": "Regal und Feld 2",
    "block": "left",
    "row": 15,
    "col": 3
  },
  {
    "id": "Regal und Feld 2!D15",
    "label": "R2.1.5",
    "sheet": "Regal und Feld 2",
    "cell": "D15",
    "area": "Regal und Feld 2",
    "block": "left",
    "row": 15,
    "col": 4
  },
  {
    "id": "Regal und Feld 2!E15",
    "label": "R2.1.9",
    "sheet": "Regal und Feld 2",
    "cell": "E15",
    "area": "Regal und Feld 2",
    "block": "left",
    "row": 15,
    "col": 5
  },
  {
    "id": "Regal und Feld 2!F15",
    "label": "F2.4",
    "sheet": "Regal und Feld 2",
    "cell": "F15",
    "area": "Regal und Feld 2",
    "block": "middle",
    "row": 15,
    "col": 6
  },
  {
    "id": "Regal und Feld 2!H15",
    "label": "F2.8",
    "sheet": "Regal und Feld 2",
    "cell": "H15",
    "area": "Regal und Feld 2",
    "block": "middle",
    "row": 15,
    "col": 8
  },
  {
    "id": "Regal und Feld 2!J15",
    "label": "F2.12",
    "sheet": "Regal und Feld 2",
    "cell": "J15",
    "area": "Regal und Feld 2",
    "block": "middle",
    "row": 15,
    "col": 10
  },
  {
    "id": "Regal und Feld 2!L15",
    "label": "F2.16",
    "sheet": "Regal und Feld 2",
    "cell": "L15",
    "area": "Regal und Feld 2",
    "block": "middle",
    "row": 15,
    "col": 12
  },
  {
    "id": "Regal und Feld 2!N15",
    "label": "F2.20",
    "sheet": "Regal und Feld 2",
    "cell": "N15",
    "area": "Regal und Feld 2",
    "block": "middle",
    "row": 15,
    "col": 14
  },
  {
    "id": "Regal und Feld 2!P15",
    "label": "R2.3.1",
    "sheet": "Regal und Feld 2",
    "cell": "P15",
    "area": "Regal und Feld 2",
    "block": "right",
    "row": 15,
    "col": 16
  },
  {
    "id": "Regal und Feld 2!Q15",
    "label": "R2.3.5",
    "sheet": "Regal und Feld 2",
    "cell": "Q15",
    "area": "Regal und Feld 2",
    "block": "right",
    "row": 15,
    "col": 17
  },
  {
    "id": "Regal und Feld 2!R15",
    "label": "R2.3.9",
    "sheet": "Regal und Feld 2",
    "cell": "R15",
    "area": "Regal und Feld 2",
    "block": "right",
    "row": 15,
    "col": 18
  },
  {
    "id": "Regal und Feld 3!G5",
    "label": "R2.2.13",
    "sheet": "Regal und Feld 3",
    "cell": "G5",
    "area": "Regal und Feld 3",
    "block": "top",
    "row": 5,
    "col": 7
  },
  {
    "id": "Regal und Feld 3!H5",
    "label": "R2.2.14",
    "sheet": "Regal und Feld 3",
    "cell": "H5",
    "area": "Regal und Feld 3",
    "block": "top",
    "row": 5,
    "col": 8
  },
  {
    "id": "Regal und Feld 3!I5",
    "label": "R2.2.15",
    "sheet": "Regal und Feld 3",
    "cell": "I5",
    "area": "Regal und Feld 3",
    "block": "top",
    "row": 5,
    "col": 9
  },
  {
    "id": "Regal und Feld 3!J5",
    "label": "R2.2.16",
    "sheet": "Regal und Feld 3",
    "cell": "J5",
    "area": "Regal und Feld 3",
    "block": "top",
    "row": 5,
    "col": 10
  },
  {
    "id": "Regal und Feld 3!K5",
    "label": "R2.2.17",
    "sheet": "Regal und Feld 3",
    "cell": "K5",
    "area": "Regal und Feld 3",
    "block": "top",
    "row": 5,
    "col": 11
  },
  {
    "id": "Regal und Feld 3!L5",
    "label": "R2.2.18",
    "sheet": "Regal und Feld 3",
    "cell": "L5",
    "area": "Regal und Feld 3",
    "block": "top",
    "row": 5,
    "col": 12
  },
  {
    "id": "Regal und Feld 3!G6",
    "label": "R2.2.7",
    "sheet": "Regal und Feld 3",
    "cell": "G6",
    "area": "Regal und Feld 3",
    "block": "top",
    "row": 6,
    "col": 7
  },
  {
    "id": "Regal und Feld 3!H6",
    "label": "R2.2.8",
    "sheet": "Regal und Feld 3",
    "cell": "H6",
    "area": "Regal und Feld 3",
    "block": "top",
    "row": 6,
    "col": 8
  },
  {
    "id": "Regal und Feld 3!I6",
    "label": "R2.2.9",
    "sheet": "Regal und Feld 3",
    "cell": "I6",
    "area": "Regal und Feld 3",
    "block": "top",
    "row": 6,
    "col": 9
  },
  {
    "id": "Regal und Feld 3!J6",
    "label": "R2.2.10",
    "sheet": "Regal und Feld 3",
    "cell": "J6",
    "area": "Regal und Feld 3",
    "block": "top",
    "row": 6,
    "col": 10
  },
  {
    "id": "Regal und Feld 3!K6",
    "label": "R2.2.11",
    "sheet": "Regal und Feld 3",
    "cell": "K6",
    "area": "Regal und Feld 3",
    "block": "top",
    "row": 6,
    "col": 11
  },
  {
    "id": "Regal und Feld 3!L6",
    "label": "R2.2.12",
    "sheet": "Regal und Feld 3",
    "cell": "L6",
    "area": "Regal und Feld 3",
    "block": "top",
    "row": 6,
    "col": 12
  },
  {
    "id": "Regal und Feld 3!G7",
    "label": "R2.2.1",
    "sheet": "Regal und Feld 3",
    "cell": "G7",
    "area": "Regal und Feld 3",
    "block": "top",
    "row": 7,
    "col": 7
  },
  {
    "id": "Regal und Feld 3!H7",
    "label": "R2.2.2",
    "sheet": "Regal und Feld 3",
    "cell": "H7",
    "area": "Regal und Feld 3",
    "block": "top",
    "row": 7,
    "col": 8
  },
  {
    "id": "Regal und Feld 3!I7",
    "label": "R2.2.3",
    "sheet": "Regal und Feld 3",
    "cell": "I7",
    "area": "Regal und Feld 3",
    "block": "top",
    "row": 7,
    "col": 9
  },
  {
    "id": "Regal und Feld 3!J7",
    "label": "R2.2.4",
    "sheet": "Regal und Feld 3",
    "cell": "J7",
    "area": "Regal und Feld 3",
    "block": "top",
    "row": 7,
    "col": 10
  },
  {
    "id": "Regal und Feld 3!K7",
    "label": "R2.2.5",
    "sheet": "Regal und Feld 3",
    "cell": "K7",
    "area": "Regal und Feld 3",
    "block": "top",
    "row": 7,
    "col": 11
  },
  {
    "id": "Regal und Feld 3!L7",
    "label": "R2.2.6",
    "sheet": "Regal und Feld 3",
    "cell": "L7",
    "area": "Regal und Feld 3",
    "block": "top",
    "row": 7,
    "col": 12
  },
  {
    "id": "Regal und Feld 3!A8",
    "label": "R2.1.4",
    "sheet": "Regal und Feld 3",
    "cell": "A8",
    "area": "Regal und Feld 3",
    "block": "left",
    "row": 8,
    "col": 1
  },
  {
    "id": "Regal und Feld 3!B8",
    "label": "R2.1.8",
    "sheet": "Regal und Feld 3",
    "cell": "B8",
    "area": "Regal und Feld 3",
    "block": "left",
    "row": 8,
    "col": 2
  },
  {
    "id": "Regal und Feld 3!C8",
    "label": "R2.1.12",
    "sheet": "Regal und Feld 3",
    "cell": "C8",
    "area": "Regal und Feld 3",
    "block": "left",
    "row": 8,
    "col": 3
  },
  {
    "id": "Regal und Feld 3!D8",
    "label": "F2.1",
    "sheet": "Regal und Feld 3",
    "cell": "D8",
    "area": "Regal und Feld 3",
    "block": "middle",
    "row": 8,
    "col": 4
  },
  {
    "id": "Regal und Feld 3!F8",
    "label": "F2.5",
    "sheet": "Regal und Feld 3",
    "cell": "F8",
    "area": "Regal und Feld 3",
    "block": "middle",
    "row": 8,
    "col": 6
  },
  {
    "id": "Regal und Feld 3!H8",
    "label": "F2.9",
    "sheet": "Regal und Feld 3",
    "cell": "H8",
    "area": "Regal und Feld 3",
    "block": "middle",
    "row": 8,
    "col": 8
  },
  {
    "id": "Regal und Feld 3!J8",
    "label": "F2.13",
    "sheet": "Regal und Feld 3",
    "cell": "J8",
    "area": "Regal und Feld 3",
    "block": "middle",
    "row": 8,
    "col": 10
  },
  {
    "id": "Regal und Feld 3!L8",
    "label": "F2.17",
    "sheet": "Regal und Feld 3",
    "cell": "L8",
    "area": "Regal und Feld 3",
    "block": "middle",
    "row": 8,
    "col": 12
  },
  {
    "id": "Regal und Feld 3!N8",
    "label": "R2.3.4",
    "sheet": "Regal und Feld 3",
    "cell": "N8",
    "area": "Regal und Feld 3",
    "block": "right",
    "row": 8,
    "col": 14
  },
  {
    "id": "Regal und Feld 3!O8",
    "label": "R2.3.8",
    "sheet": "Regal und Feld 3",
    "cell": "O8",
    "area": "Regal und Feld 3",
    "block": "right",
    "row": 8,
    "col": 15
  },
  {
    "id": "Regal und Feld 3!P8",
    "label": "R2.3.12",
    "sheet": "Regal und Feld 3",
    "cell": "P8",
    "area": "Regal und Feld 3",
    "block": "right",
    "row": 8,
    "col": 16
  },
  {
    "id": "Regal und Feld 3!A10",
    "label": "R2.1.3",
    "sheet": "Regal und Feld 3",
    "cell": "A10",
    "area": "Regal und Feld 3",
    "block": "left",
    "row": 10,
    "col": 1
  },
  {
    "id": "Regal und Feld 3!B10",
    "label": "R2.1.7",
    "sheet": "Regal und Feld 3",
    "cell": "B10",
    "area": "Regal und Feld 3",
    "block": "left",
    "row": 10,
    "col": 2
  },
  {
    "id": "Regal und Feld 3!C10",
    "label": "R2.1.11",
    "sheet": "Regal und Feld 3",
    "cell": "C10",
    "area": "Regal und Feld 3",
    "block": "left",
    "row": 10,
    "col": 3
  },
  {
    "id": "Regal und Feld 3!D10",
    "label": "F2.2",
    "sheet": "Regal und Feld 3",
    "cell": "D10",
    "area": "Regal und Feld 3",
    "block": "middle",
    "row": 10,
    "col": 4
  },
  {
    "id": "Regal und Feld 3!F10",
    "label": "F2.6",
    "sheet": "Regal und Feld 3",
    "cell": "F10",
    "area": "Regal und Feld 3",
    "block": "middle",
    "row": 10,
    "col": 6
  },
  {
    "id": "Regal und Feld 3!H10",
    "label": "F2.10",
    "sheet": "Regal und Feld 3",
    "cell": "H10",
    "area": "Regal und Feld 3",
    "block": "middle",
    "row": 10,
    "col": 8
  },
  {
    "id": "Regal und Feld 3!J10",
    "label": "F2.14",
    "sheet": "Regal und Feld 3",
    "cell": "J10",
    "area": "Regal und Feld 3",
    "block": "middle",
    "row": 10,
    "col": 10
  },
  {
    "id": "Regal und Feld 3!L10",
    "label": "F2.18",
    "sheet": "Regal und Feld 3",
    "cell": "L10",
    "area": "Regal und Feld 3",
    "block": "middle",
    "row": 10,
    "col": 12
  },
  {
    "id": "Regal und Feld 3!N10",
    "label": "R2.3.3",
    "sheet": "Regal und Feld 3",
    "cell": "N10",
    "area": "Regal und Feld 3",
    "block": "right",
    "row": 10,
    "col": 14
  },
  {
    "id": "Regal und Feld 3!O10",
    "label": "R2.3.7",
    "sheet": "Regal und Feld 3",
    "cell": "O10",
    "area": "Regal und Feld 3",
    "block": "right",
    "row": 10,
    "col": 15
  },
  {
    "id": "Regal und Feld 3!P10",
    "label": "R2.3.11",
    "sheet": "Regal und Feld 3",
    "cell": "P10",
    "area": "Regal und Feld 3",
    "block": "right",
    "row": 10,
    "col": 16
  },
  {
    "id": "Regal und Feld 3!A12",
    "label": "R2.1.2",
    "sheet": "Regal und Feld 3",
    "cell": "A12",
    "area": "Regal und Feld 3",
    "block": "left",
    "row": 12,
    "col": 1
  },
  {
    "id": "Regal und Feld 3!B12",
    "label": "R2.1.6",
    "sheet": "Regal und Feld 3",
    "cell": "B12",
    "area": "Regal und Feld 3",
    "block": "left",
    "row": 12,
    "col": 2
  },
  {
    "id": "Regal und Feld 3!C12",
    "label": "R2.1.10",
    "sheet": "Regal und Feld 3",
    "cell": "C12",
    "area": "Regal und Feld 3",
    "block": "left",
    "row": 12,
    "col": 3
  },
  {
    "id": "Regal und Feld 3!D12",
    "label": "F2.3",
    "sheet": "Regal und Feld 3",
    "cell": "D12",
    "area": "Regal und Feld 3",
    "block": "middle",
    "row": 12,
    "col": 4
  },
  {
    "id": "Regal und Feld 3!F12",
    "label": "F2.7",
    "sheet": "Regal und Feld 3",
    "cell": "F12",
    "area": "Regal und Feld 3",
    "block": "middle",
    "row": 12,
    "col": 6
  },
  {
    "id": "Regal und Feld 3!H12",
    "label": "F2.11",
    "sheet": "Regal und Feld 3",
    "cell": "H12",
    "area": "Regal und Feld 3",
    "block": "middle",
    "row": 12,
    "col": 8
  },
  {
    "id": "Regal und Feld 3!J12",
    "label": "F2.15",
    "sheet": "Regal und Feld 3",
    "cell": "J12",
    "area": "Regal und Feld 3",
    "block": "middle",
    "row": 12,
    "col": 10
  },
  {
    "id": "Regal und Feld 3!L12",
    "label": "F2.19",
    "sheet": "Regal und Feld 3",
    "cell": "L12",
    "area": "Regal und Feld 3",
    "block": "middle",
    "row": 12,
    "col": 12
  },
  {
    "id": "Regal und Feld 3!N12",
    "label": "R2.3.2",
    "sheet": "Regal und Feld 3",
    "cell": "N12",
    "area": "Regal und Feld 3",
    "block": "right",
    "row": 12,
    "col": 14
  },
  {
    "id": "Regal und Feld 3!O12",
    "label": "R2.3.6",
    "sheet": "Regal und Feld 3",
    "cell": "O12",
    "area": "Regal und Feld 3",
    "block": "right",
    "row": 12,
    "col": 15
  },
  {
    "id": "Regal und Feld 3!P12",
    "label": "R2.3.10",
    "sheet": "Regal und Feld 3",
    "cell": "P12",
    "area": "Regal und Feld 3",
    "block": "right",
    "row": 12,
    "col": 16
  },
  {
    "id": "Regal und Feld 3!A14",
    "label": "R2.1.1",
    "sheet": "Regal und Feld 3",
    "cell": "A14",
    "area": "Regal und Feld 3",
    "block": "left",
    "row": 14,
    "col": 1
  },
  {
    "id": "Regal und Feld 3!B14",
    "label": "R2.1.5",
    "sheet": "Regal und Feld 3",
    "cell": "B14",
    "area": "Regal und Feld 3",
    "block": "left",
    "row": 14,
    "col": 2
  },
  {
    "id": "Regal und Feld 3!C14",
    "label": "R2.1.9",
    "sheet": "Regal und Feld 3",
    "cell": "C14",
    "area": "Regal und Feld 3",
    "block": "left",
    "row": 14,
    "col": 3
  },
  {
    "id": "Regal und Feld 3!D14",
    "label": "F2.4",
    "sheet": "Regal und Feld 3",
    "cell": "D14",
    "area": "Regal und Feld 3",
    "block": "middle",
    "row": 14,
    "col": 4
  },
  {
    "id": "Regal und Feld 3!F14",
    "label": "F2.8",
    "sheet": "Regal und Feld 3",
    "cell": "F14",
    "area": "Regal und Feld 3",
    "block": "middle",
    "row": 14,
    "col": 6
  },
  {
    "id": "Regal und Feld 3!H14",
    "label": "F2.12",
    "sheet": "Regal und Feld 3",
    "cell": "H14",
    "area": "Regal und Feld 3",
    "block": "middle",
    "row": 14,
    "col": 8
  },
  {
    "id": "Regal und Feld 3!J14",
    "label": "F2.16",
    "sheet": "Regal und Feld 3",
    "cell": "J14",
    "area": "Regal und Feld 3",
    "block": "middle",
    "row": 14,
    "col": 10
  },
  {
    "id": "Regal und Feld 3!L14",
    "label": "F2.20",
    "sheet": "Regal und Feld 3",
    "cell": "L14",
    "area": "Regal und Feld 3",
    "block": "middle",
    "row": 14,
    "col": 12
  },
  {
    "id": "Regal und Feld 3!N14",
    "label": "R2.3.1",
    "sheet": "Regal und Feld 3",
    "cell": "N14",
    "area": "Regal und Feld 3",
    "block": "right",
    "row": 14,
    "col": 14
  },
  {
    "id": "Regal und Feld 3!O14",
    "label": "R2.3.5",
    "sheet": "Regal und Feld 3",
    "cell": "O14",
    "area": "Regal und Feld 3",
    "block": "right",
    "row": 14,
    "col": 15
  },
  {
    "id": "Regal und Feld 3!P14",
    "label": "R2.3.9",
    "sheet": "Regal und Feld 3",
    "cell": "P14",
    "area": "Regal und Feld 3",
    "block": "right",
    "row": 14,
    "col": 16
  },
  {
    "id": "Regal und Feld 4!E5",
    "label": "R3.2.24",
    "sheet": "Regal und Feld 4",
    "cell": "E5",
    "area": "Regal und Feld 4",
    "block": "top",
    "row": 5,
    "col": 5
  },
  {
    "id": "Regal und Feld 4!F5",
    "label": "R3.2.25",
    "sheet": "Regal und Feld 4",
    "cell": "F5",
    "area": "Regal und Feld 4",
    "block": "top",
    "row": 5,
    "col": 6
  },
  {
    "id": "Regal und Feld 4!G5",
    "label": "R3.2.26",
    "sheet": "Regal und Feld 4",
    "cell": "G5",
    "area": "Regal und Feld 4",
    "block": "top",
    "row": 5,
    "col": 7
  },
  {
    "id": "Regal und Feld 4!H5",
    "label": "R3.2.27",
    "sheet": "Regal und Feld 4",
    "cell": "H5",
    "area": "Regal und Feld 4",
    "block": "top",
    "row": 5,
    "col": 8
  },
  {
    "id": "Regal und Feld 4!I5",
    "label": "R3.2.28",
    "sheet": "Regal und Feld 4",
    "cell": "I5",
    "area": "Regal und Feld 4",
    "block": "top",
    "row": 5,
    "col": 9
  },
  {
    "id": "Regal und Feld 4!J5",
    "label": "R3.2.29",
    "sheet": "Regal und Feld 4",
    "cell": "J5",
    "area": "Regal und Feld 4",
    "block": "top",
    "row": 5,
    "col": 10
  },
  {
    "id": "Regal und Feld 4!K5",
    "label": "R3.2.30",
    "sheet": "Regal und Feld 4",
    "cell": "K5",
    "area": "Regal und Feld 4",
    "block": "top",
    "row": 5,
    "col": 11
  },
  {
    "id": "Regal und Feld 4!L5",
    "label": "R3.2.31",
    "sheet": "Regal und Feld 4",
    "cell": "L5",
    "area": "Regal und Feld 4",
    "block": "top",
    "row": 5,
    "col": 12
  },
  {
    "id": "Regal und Feld 4!M5",
    "label": "R3.2.32",
    "sheet": "Regal und Feld 4",
    "cell": "M5",
    "area": "Regal und Feld 4",
    "block": "top",
    "row": 5,
    "col": 13
  },
  {
    "id": "Regal und Feld 4!N5",
    "label": "R3.2.33",
    "sheet": "Regal und Feld 4",
    "cell": "N5",
    "area": "Regal und Feld 4",
    "block": "top",
    "row": 5,
    "col": 14
  },
  {
    "id": "Regal und Feld 4!O5",
    "label": "R3.2.34",
    "sheet": "Regal und Feld 4",
    "cell": "O5",
    "area": "Regal und Feld 4",
    "block": "top",
    "row": 5,
    "col": 15
  },
  {
    "id": "Regal und Feld 4!P5",
    "label": "R3.2.35",
    "sheet": "Regal und Feld 4",
    "cell": "P5",
    "area": "Regal und Feld 4",
    "block": "top",
    "row": 5,
    "col": 16
  },
  {
    "id": "Regal und Feld 4!Q5",
    "label": "R3.2.35",
    "sheet": "Regal und Feld 4",
    "cell": "Q5",
    "area": "Regal und Feld 4",
    "block": "top",
    "row": 5,
    "col": 17
  },
  {
    "id": "Regal und Feld 4!R5",
    "label": "R3.2.35",
    "sheet": "Regal und Feld 4",
    "cell": "R5",
    "area": "Regal und Feld 4",
    "block": "top",
    "row": 5,
    "col": 18
  },
  {
    "id": "Regal und Feld 4!S5",
    "label": "R3.2.35",
    "sheet": "Regal und Feld 4",
    "cell": "S5",
    "area": "Regal und Feld 4",
    "block": "top",
    "row": 5,
    "col": 19
  },
  {
    "id": "Regal und Feld 4!E6",
    "label": "R3.2.13",
    "sheet": "Regal und Feld 4",
    "cell": "E6",
    "area": "Regal und Feld 4",
    "block": "top",
    "row": 6,
    "col": 5
  },
  {
    "id": "Regal und Feld 4!F6",
    "label": "R3.2.14",
    "sheet": "Regal und Feld 4",
    "cell": "F6",
    "area": "Regal und Feld 4",
    "block": "top",
    "row": 6,
    "col": 6
  },
  {
    "id": "Regal und Feld 4!G6",
    "label": "R3.2.15",
    "sheet": "Regal und Feld 4",
    "cell": "G6",
    "area": "Regal und Feld 4",
    "block": "top",
    "row": 6,
    "col": 7
  },
  {
    "id": "Regal und Feld 4!H6",
    "label": "R3.2.16",
    "sheet": "Regal und Feld 4",
    "cell": "H6",
    "area": "Regal und Feld 4",
    "block": "top",
    "row": 6,
    "col": 8
  },
  {
    "id": "Regal und Feld 4!I6",
    "label": "R3.2.17",
    "sheet": "Regal und Feld 4",
    "cell": "I6",
    "area": "Regal und Feld 4",
    "block": "top",
    "row": 6,
    "col": 9
  },
  {
    "id": "Regal und Feld 4!J6",
    "label": "R3.2.18",
    "sheet": "Regal und Feld 4",
    "cell": "J6",
    "area": "Regal und Feld 4",
    "block": "top",
    "row": 6,
    "col": 10
  },
  {
    "id": "Regal und Feld 4!K6",
    "label": "R3.2.19",
    "sheet": "Regal und Feld 4",
    "cell": "K6",
    "area": "Regal und Feld 4",
    "block": "top",
    "row": 6,
    "col": 11
  },
  {
    "id": "Regal und Feld 4!L6",
    "label": "R3.2.20",
    "sheet": "Regal und Feld 4",
    "cell": "L6",
    "area": "Regal und Feld 4",
    "block": "top",
    "row": 6,
    "col": 12
  },
  {
    "id": "Regal und Feld 4!M6",
    "label": "R3.2.21",
    "sheet": "Regal und Feld 4",
    "cell": "M6",
    "area": "Regal und Feld 4",
    "block": "top",
    "row": 6,
    "col": 13
  },
  {
    "id": "Regal und Feld 4!N6",
    "label": "R3.2.22",
    "sheet": "Regal und Feld 4",
    "cell": "N6",
    "area": "Regal und Feld 4",
    "block": "top",
    "row": 6,
    "col": 14
  },
  {
    "id": "Regal und Feld 4!O6",
    "label": "R3.2.23",
    "sheet": "Regal und Feld 4",
    "cell": "O6",
    "area": "Regal und Feld 4",
    "block": "top",
    "row": 6,
    "col": 15
  },
  {
    "id": "Regal und Feld 4!P6",
    "label": "R3.2.24",
    "sheet": "Regal und Feld 4",
    "cell": "P6",
    "area": "Regal und Feld 4",
    "block": "top",
    "row": 6,
    "col": 16
  },
  {
    "id": "Regal und Feld 4!Q6",
    "label": "R3.2.24",
    "sheet": "Regal und Feld 4",
    "cell": "Q6",
    "area": "Regal und Feld 4",
    "block": "top",
    "row": 6,
    "col": 17
  },
  {
    "id": "Regal und Feld 4!R6",
    "label": "R3.2.24",
    "sheet": "Regal und Feld 4",
    "cell": "R6",
    "area": "Regal und Feld 4",
    "block": "top",
    "row": 6,
    "col": 18
  },
  {
    "id": "Regal und Feld 4!S6",
    "label": "R3.2.24",
    "sheet": "Regal und Feld 4",
    "cell": "S6",
    "area": "Regal und Feld 4",
    "block": "top",
    "row": 6,
    "col": 19
  },
  {
    "id": "Regal und Feld 4!E7",
    "label": "R3.2.1",
    "sheet": "Regal und Feld 4",
    "cell": "E7",
    "area": "Regal und Feld 4",
    "block": "top",
    "row": 7,
    "col": 5
  },
  {
    "id": "Regal und Feld 4!F7",
    "label": "R3.2.2",
    "sheet": "Regal und Feld 4",
    "cell": "F7",
    "area": "Regal und Feld 4",
    "block": "top",
    "row": 7,
    "col": 6
  },
  {
    "id": "Regal und Feld 4!G7",
    "label": "R3.2.3",
    "sheet": "Regal und Feld 4",
    "cell": "G7",
    "area": "Regal und Feld 4",
    "block": "top",
    "row": 7,
    "col": 7
  },
  {
    "id": "Regal und Feld 4!H7",
    "label": "R3.2.4",
    "sheet": "Regal und Feld 4",
    "cell": "H7",
    "area": "Regal und Feld 4",
    "block": "top",
    "row": 7,
    "col": 8
  },
  {
    "id": "Regal und Feld 4!I7",
    "label": "R3.2.5",
    "sheet": "Regal und Feld 4",
    "cell": "I7",
    "area": "Regal und Feld 4",
    "block": "top",
    "row": 7,
    "col": 9
  },
  {
    "id": "Regal und Feld 4!J7",
    "label": "R3.2.6",
    "sheet": "Regal und Feld 4",
    "cell": "J7",
    "area": "Regal und Feld 4",
    "block": "top",
    "row": 7,
    "col": 10
  },
  {
    "id": "Regal und Feld 4!K7",
    "label": "R3.2.7",
    "sheet": "Regal und Feld 4",
    "cell": "K7",
    "area": "Regal und Feld 4",
    "block": "top",
    "row": 7,
    "col": 11
  },
  {
    "id": "Regal und Feld 4!L7",
    "label": "R3.2.8",
    "sheet": "Regal und Feld 4",
    "cell": "L7",
    "area": "Regal und Feld 4",
    "block": "top",
    "row": 7,
    "col": 12
  },
  {
    "id": "Regal und Feld 4!M7",
    "label": "R3.2.9",
    "sheet": "Regal und Feld 4",
    "cell": "M7",
    "area": "Regal und Feld 4",
    "block": "top",
    "row": 7,
    "col": 13
  },
  {
    "id": "Regal und Feld 4!N7",
    "label": "R3.2.10",
    "sheet": "Regal und Feld 4",
    "cell": "N7",
    "area": "Regal und Feld 4",
    "block": "top",
    "row": 7,
    "col": 14
  },
  {
    "id": "Regal und Feld 4!O7",
    "label": "R3.2.11",
    "sheet": "Regal und Feld 4",
    "cell": "O7",
    "area": "Regal und Feld 4",
    "block": "top",
    "row": 7,
    "col": 15
  },
  {
    "id": "Regal und Feld 4!P7",
    "label": "R3.2.12",
    "sheet": "Regal und Feld 4",
    "cell": "P7",
    "area": "Regal und Feld 4",
    "block": "top",
    "row": 7,
    "col": 16
  },
  {
    "id": "Regal und Feld 4!Q7",
    "label": "R3.2.12",
    "sheet": "Regal und Feld 4",
    "cell": "Q7",
    "area": "Regal und Feld 4",
    "block": "top",
    "row": 7,
    "col": 17
  },
  {
    "id": "Regal und Feld 4!R7",
    "label": "R3.2.12",
    "sheet": "Regal und Feld 4",
    "cell": "R7",
    "area": "Regal und Feld 4",
    "block": "top",
    "row": 7,
    "col": 18
  },
  {
    "id": "Regal und Feld 4!S7",
    "label": "R3.2.12",
    "sheet": "Regal und Feld 4",
    "cell": "S7",
    "area": "Regal und Feld 4",
    "block": "top",
    "row": 7,
    "col": 19
  }
];
