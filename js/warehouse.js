// ===================================
// Einlagern / Auslagern
// ===================================

let currentAuslagerPalette = null;

const Warehouse = {

    init() {
        this.initEinlagern();
        this.initAuslagern();
    },

    initEinlagern() {
        UI.initPlaceDropdowns("bereichInput", "platzVonInput");
        UI.fillPlaceSelect("platzBisInput", document.getElementById("bereichInput").value);

        document.getElementById("bereichInput").addEventListener("change", () => {
            UI.fillPlaceSelect("platzVonInput", document.getElementById("bereichInput").value);
            UI.fillPlaceSelect("platzBisInput", document.getElementById("bereichInput").value);
            document.getElementById("platzBisInput").value = document.getElementById("platzVonInput").value;
        });

        document.getElementById("platzVonInput").addEventListener("change", () => {
            document.getElementById("platzBisInput").value = document.getElementById("platzVonInput").value;
        });

        document.getElementById("savePaletteBtn").addEventListener("click", () => {
            this.savePalette();
        });
    },

    initAuslagern() {
        UI.initPlaceDropdowns("ausBereichInput", "ausPlatzInput");

        document.getElementById("findPlaceBtn").addEventListener("click", () => {
            this.findPlace();
        });

        document.getElementById("removePaletteBtn").addEventListener("click", () => {
            this.removePalette();
        });
    },

    async savePalette() {
        const auftrag = document.getElementById("auftragInput").value.trim();
        const position = document.getElementById("positionInput").value.trim();
        const palette = Utils.cleanBarcode(document.getElementById("paletteInput").value.trim());

        const bereich = document.getElementById("bereichInput").value;
        const platzVon = Number(document.getElementById("platzVonInput").value);
        const platzBis = Number(document.getElementById("platzBisInput").value);

        if (!auftrag || !position || !palette) {
            Utils.showMessage("Bitte Auftrag, Position und Palettennummer eingeben.", "error");
            return;
        }

        if (platzBis < platzVon) {
            Utils.showMessage("Platz bis darf nicht kleiner als Platz von sein.", "error");
            return;
        }

        const frei = await FirestoreService.isPlaceFree(bereich, platzVon, platzBis);

        if (!frei) {
            Utils.showMessage("Mindestens ein ausgewählter Lagerplatz ist bereits belegt.", "error");
            return;
        }

        const data = {
            auftrag,
            position,
            auftragKey: Utils.createOrderKey(auftrag, position),
            palette,
            bereich,
            platzVon,
            platzBis,
            eingelagertAm: Utils.now(),
            ausgelagert: false
        };

        await FirestoreService.savePalette(data);

        Utils.showMessage(`Palette ${palette} eingelagert.`);

        document.getElementById("paletteInput").value = "";
        document.getElementById("platzBisInput").value = document.getElementById("platzVonInput").value;
    },

    async findPlace() {
        const bereich = document.getElementById("ausBereichInput").value;
        const platz = Number(document.getElementById("ausPlatzInput").value);

        const palette = await FirestoreService.findByPlace(bereich, platz);

        const box = document.getElementById("auslagerInfo");
        const removeBtn = document.getElementById("removePaletteBtn");

        if (!palette) {
            currentAuslagerPalette = null;
            box.classList.remove("hidden");
            box.innerHTML = `<div class="result-title">Lagerplatz frei</div>`;
            removeBtn.classList.add("hidden");
            return;
        }

        currentAuslagerPalette = palette;

        box.classList.remove("hidden");
        removeBtn.classList.remove("hidden");

        box.innerHTML = `
            <div class="result-title">${palette.bereich} · Platz ${palette.platzVon}${palette.platzBis !== palette.platzVon ? "–" + palette.platzBis : ""}</div>
            <div class="result-line"><strong>Auftrag:</strong> ${palette.auftrag} / ${palette.position}</div>
            <div class="result-line"><strong>Palette:</strong> ${palette.palette}</div>
        `;
    },

    async removePalette() {
        if (!currentAuslagerPalette) {
            Utils.showMessage("Keine Palette zum Auslagern ausgewählt.", "error");
            return;
        }

        await FirestoreService.updatePalette(currentAuslagerPalette.id, {
            ausgelagert: true,
            ausgelagertAm: Utils.now()
        });

        Utils.showMessage("Palette ausgelagert.");

        currentAuslagerPalette = null;

        document.getElementById("auslagerInfo").classList.add("hidden");
        document.getElementById("removePaletteBtn").classList.add("hidden");
    }

};
