// ===================================
// Lagerplatz-App V2
// Startdatei
// ===================================

window.addEventListener("DOMContentLoaded", () => {

    console.log("Lagerplatz-App wird gestartet...");

    // Oberfläche initialisieren
    UI.init();

    // Barcode-Scanner
    Scanner.init();

    // Ein-/Auslagern
    Warehouse.init();

    // Suche + Übersicht
    Search.init();

    // PlatzBis automatisch auf PlatzVon setzen
    const platzVon = document.getElementById("platzVonInput");
    const platzBis = document.getElementById("platzBisInput");

    if (platzVon && platzBis) {
        platzBis.value = platzVon.value;

        platzVon.addEventListener("change", () => {
            platzBis.value = platzVon.value;
        });
    }

    // Fokus beim Start
    const auftrag = document.getElementById("auftragInput");

    if (auftrag) {
        auftrag.focus();
    }

    console.log("Lagerplatz-App gestartet.");

});
