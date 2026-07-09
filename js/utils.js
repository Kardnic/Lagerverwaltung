// ===================================
// Hilfsfunktionen
// ===================================

const Utils = {

    // Führende Nullen entfernen
    cleanBarcode(barcode) {
        return String(barcode || "").replace(/^0+/, "");
    },

    // Auftragsschlüssel erzeugen
    createOrderKey(auftrag, position) {
        return `${auftrag}-${position}`;
    },

    // Aktuelles Datum/Uhrzeit
    now() {
        return new Date().toISOString();
    },

    // Zahlenbereich erzeugen
    range(start, end) {
        const arr = [];

        for (let i = start; i <= end; i++) {
            arr.push(i);
        }

        return arr;
    },

    // Meldung anzeigen
    showMessage(text, type = "ok") {

        const box = document.getElementById("message");

        if (!box) return;

        box.textContent = text;
        box.className = `message ${type}`;

        setTimeout(() => {
            box.className = "message";
        }, 4000);

    }

};
