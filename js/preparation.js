// ===================================
// Arbeitsvorbereitung
// ===================================

const Preparation = {

    storageKey: "arbeitsvorbereitung",
    items: [],

    init() {
        this.load();
        this.fillMachineSelect();
        this.bindEvents();
        this.render();
    },

    bindEvents() {
        const addBtn = document.getElementById("addToPreparationBtn");
        const clearBtn = document.getElementById("clearPreparationBtn");
        const completeBtn = document.getElementById("completePreparationBtn");
        const printBtn = document.getElementById("printPreparationBtn");
        const sortInput = document.getElementById("preparationSortInput");

        addBtn?.addEventListener("click", () => {
            this.addSelectedPalettes();
        });

        clearBtn?.addEventListener("click", () => {
            this.clear();
        });

        completeBtn?.addEventListener("click", () => {
            this.complete();
        });

        printBtn?.addEventListener("click", () => {
            this.print();
        });

        sortInput?.addEventListener("change", () => {
            this.render();
        });
    },

    fillMachineSelect() {
        const select = document.getElementById("searchMachineInput");
        if (!select) return;

        select.innerHTML = "";

        CONFIG.maschinen.forEach(machine => {
            const option = document.createElement("option");
            option.value = machine;
            option.textContent = machine;
            select.appendChild(option);
        });
    },

    load() {
        try {
            this.items = JSON.parse(
                localStorage.getItem(this.storageKey) || "[]"
            );
        } catch (error) {
            console.error(error);
            this.items = [];
        }
    },

    save() {
        localStorage.setItem(
            this.storageKey,
            JSON.stringify(this.items)
        );

        this.render();
    },

    async addSelectedPalettes() {
        const machine = document.getElementById("searchMachineInput")?.value;

        const selectedCheckboxes = Array.from(
            document.querySelectorAll(".search-palette-checkbox:checked")
        );

        if (!machine) {
            Utils.showMessage("Bitte eine Maschine auswählen.", "error");
            return;
        }

        if (!selectedCheckboxes.length) {
            Utils.showMessage(
                "Bitte mindestens eine Palette auswählen.",
                "error"
            );
            return;
        }

        let added = 0;
        let skipped = 0;

        for (const checkbox of selectedCheckboxes) {
            const paletteId = checkbox.dataset.paletteId;

            const palette = Search.allPalettes.find(
                item => item.id === paletteId
            );

            if (!palette) {
                skipped++;
                continue;
            }

            const alreadyAdded = this.items.some(
                item => item.id === palette.id
            );

            if (alreadyAdded) {
                skipped++;
                continue;
            }

            if (palette.vorbereitet === true) {
                Utils.showMessage(
                    `Palette ${palette.palette} ist bereits für ${palette.maschine || "eine Maschine"} vorbereitet.`,
                    "error"
                );

                skipped++;
                continue;
            }

            const preparationItem = {
                id: palette.id,
                machine,
                auftrag: palette.auftrag,
                position: palette.position,
                palette: palette.palette,
                bereich: palette.bereich,
                platzVon: Number(palette.platzVon),
                platzBis: Number(palette.platzBis),
                eingelagertAm: palette.eingelagertAm || "",
                hinzugefuegtAm: Utils.now()
            };

            this.items.push(preparationItem);

            await FirestoreService.updatePalette(palette.id, {
                vorbereitet: true,
                maschine: machine,
                vorbereitetAm: Utils.now()
            });

            checkbox.checked = false;
            added++;
        }

        this.save();

        if (added > 0) {
            Utils.showMessage(
                `${added} Palette${added === 1 ? "" : "n"} für ${machine} hinzugefügt.`
            );
        } else {
            Utils.showMessage(
                "Es wurden keine neuen Paletten hinzugefügt.",
                "error"
            );
        }

        if (skipped > 0) {
            console.log(`${skipped} Palette(n) wurden übersprungen.`);
        }
    },

    getSortedItems() {
        const sortType =
            document.getElementById("preparationSortInput")?.value ||
            "lagerweg";

        const items = [...this.items];

        const areaOrder = CONFIG.bereiche.map(area => area.name);
        const machineOrder = CONFIG.maschinen;

        if (sortType === "maschine") {
            items.sort((a, b) => {
                const machineCompare =
                    machineOrder.indexOf(a.machine) -
                    machineOrder.indexOf(b.machine);

                if (machineCompare !== 0) return machineCompare;

                const orderCompare = String(a.auftrag).localeCompare(
                    String(b.auftrag),
                    "de",
                    { numeric: true }
                );

                if (orderCompare !== 0) return orderCompare;

                return Number(a.position) - Number(b.position);
            });
        }

        if (sortType === "auftrag") {
            items.sort((a, b) => {
                const orderCompare = String(a.auftrag).localeCompare(
                    String(b.auftrag),
                    "de",
                    { numeric: true }
                );

                if (orderCompare !== 0) return orderCompare;

                const positionCompare =
                    Number(a.position) - Number(b.position);

                if (positionCompare !== 0) return positionCompare;

                return String(a.machine).localeCompare(
                    String(b.machine),
                    "de",
                    { numeric: true }
                );
            });
        }

        if (sortType === "lagerweg") {
            items.sort((a, b) => {
                const areaCompare =
                    areaOrder.indexOf(a.bereich) -
                    areaOrder.indexOf(b.bereich);

                if (areaCompare !== 0) return areaCompare;

                const placeCompare =
                    Number(a.platzVon) - Number(b.platzVon);

                if (placeCompare !== 0) return placeCompare;

                return String(a.machine).localeCompare(
                    String(b.machine),
                    "de",
                    { numeric: true }
                );
            });
        }

        return items;
    },

    render() {
        const list = document.getElementById("preparationList");
        const summary = document.getElementById("preparationSummary");
        const count = document.getElementById("preparationCount");
        const mobileCount = document.getElementById("mobilePreparationCount");

        if (!list) return;

        const machines = new Set(
            this.items.map(item => item.machine)
        );

        const orders = new Set(
            this.items.map(
                item => `${item.auftrag}/${item.position}`
            )
        );

        if (summary) {
            if (!this.items.length) {
                summary.textContent =
                    "Noch keine Paletten ausgewählt.";
            } else {
                summary.textContent =
                    `${machines.size} Maschine${machines.size === 1 ? "" : "n"} · ` +
                    `${orders.size} Auftrag${orders.size === 1 ? "" : "e"} · ` +
                    `${this.items.length} Palette${this.items.length === 1 ? "" : "n"}`;
            }
        }

        const countText = this.items.length
    ? `(${this.items.length})`
    : "";

if (count) {
    count.textContent = countText;
}

if (mobileCount) {
    mobileCount.textContent = countText;
}

        if (!this.items.length) {
            list.innerHTML = `
                <div class="empty-state">
                    Noch keine Paletten zur Vorbereitung hinzugefügt.
                </div>
            `;
            return;
        }

        const sortedItems = this.getSortedItems();

        let html = "";

        sortedItems.forEach(item => {
            const placeText =
                item.platzVon === item.platzBis
                    ? item.platzVon
                    : `${item.platzVon}–${item.platzBis}`;

            html += `
                <div class="preparation-item">
                    <div class="preparation-item-main">
                        <div class="preparation-machine">
                            ${this.escapeHtml(item.machine)}
                        </div>

                        <div>
                            <strong>
                                Auftrag ${this.escapeHtml(item.auftrag)}
                                /
                                ${this.escapeHtml(item.position)}
                            </strong>

                            <div>
                                ${this.escapeHtml(item.bereich)}
                                · Platz ${placeText}
                            </div>

                            <div class="muted-text">
                                Palette ${this.escapeHtml(item.palette)}
                            </div>
                        </div>
                    </div>

                    <button
                        class="remove-preparation-item"
                        type="button"
                        data-id="${this.escapeHtml(item.id)}"
                        title="Aus Vorbereitung entfernen"
                    >
                        ✕
                    </button>
                </div>
            `;
        });

        list.innerHTML = html;

        list.querySelectorAll(".remove-preparation-item")
            .forEach(button => {
                button.addEventListener("click", () => {
                    this.removeItem(button.dataset.id);
                });
            });
    },

    async removeItem(id) {
        const item = this.items.find(entry => entry.id === id);

        if (!item) return;

        try {
            await FirestoreService.updatePalette(id, {
                vorbereitet: false,
                maschine: "",
                vorbereitetAm: ""
            });

            this.items = this.items.filter(
                entry => entry.id !== id
            );

            this.save();

            Utils.showMessage(
                `Palette ${item.palette} aus der Vorbereitung entfernt.`
            );
        } catch (error) {
            console.error(error);

            Utils.showMessage(
                "Palette konnte nicht entfernt werden.",
                "error"
            );
        }
    },

    async clear() {
        if (!this.items.length) {
            Utils.showMessage(
                "Die Vorbereitungsliste ist bereits leer.",
                "error"
            );
            return;
        }

        const confirmed = confirm(
            "Soll die komplette Vorbereitungsliste geleert werden?"
        );

        if (!confirmed) return;

        try {
            await Promise.all(
                this.items.map(item =>
                    FirestoreService.updatePalette(item.id, {
                        vorbereitet: false,
                        maschine: "",
                        vorbereitetAm: ""
                    })
                )
            );

            this.items = [];
            this.save();

            Utils.showMessage(
                "Vorbereitungsliste wurde geleert."
            );
        } catch (error) {
            console.error(error);

            Utils.showMessage(
                "Die Liste konnte nicht vollständig geleert werden.",
                "error"
            );
        }
    },

    async complete() {
        if (!this.items.length) {
            Utils.showMessage(
                "Es befinden sich keine Paletten in der Vorbereitung.",
                "error"
            );
            return;
        }

        const confirmed = confirm(
            `Sollen ${this.items.length} Paletten als ausgelagert markiert werden?`
        );

        if (!confirmed) return;

        try {
            const ausgelagertAm = Utils.now();

            await Promise.all(
                this.items.map(item =>
                    FirestoreService.updatePalette(item.id, {
                        ausgelagert: true,
                        ausgelagertAm,
                        vorbereitet: false,
                        maschine: item.machine
                    })
                )
            );

            const count = this.items.length;

            this.items = [];
            this.save();

            Utils.showMessage(
                `${count} Palette${count === 1 ? "" : "n"} ausgelagert.`
            );
        } catch (error) {
            console.error(error);

            Utils.showMessage(
                "Die Paletten konnten nicht vollständig ausgelagert werden.",
                "error"
            );
        }
    },

    print() {
        if (!this.items.length) {
            Utils.showMessage(
                "Es befinden sich keine Paletten in der Vorbereitung.",
                "error"
            );
            return;
        }

        const sortedItems = this.getSortedItems();

        const groupedByMachine = {};

        sortedItems.forEach(item => {
            if (!groupedByMachine[item.machine]) {
                groupedByMachine[item.machine] = [];
            }

            groupedByMachine[item.machine].push(item);
        });

        let content = "";

        CONFIG.maschinen.forEach(machine => {
            const items = groupedByMachine[machine];

            if (!items?.length) return;

            content += `
                <section class="machine-section">
                    <h2>Maschine ${this.escapeHtml(machine)}</h2>

                    <table>
                        <thead>
                            <tr>
                                <th>Erledigt</th>
                                <th>Auftrag / Position</th>
                                <th>Lagerplatz</th>
                                <th>Palette</th>
                            </tr>
                        </thead>

                        <tbody>
            `;

            items.forEach(item => {
                const placeText =
                    item.platzVon === item.platzBis
                        ? item.platzVon
                        : `${item.platzVon}–${item.platzBis}`;

                content += `
                    <tr>
                        <td class="checkbox-cell">☐</td>
                        <td>
                            ${this.escapeHtml(item.auftrag)}
                            /
                            ${this.escapeHtml(item.position)}
                        </td>
                        <td>
                            ${this.escapeHtml(item.bereich)}
                            · ${placeText}
                        </td>
                        <td>
                            ${this.escapeHtml(item.palette)}
                        </td>
                    </tr>
                `;
            });

            content += `
                        </tbody>
                    </table>
                </section>
            `;
        });

        const now = new Date();

        const printWindow = window.open(
            "",
            "_blank",
            "width=1000,height=800"
        );

        if (!printWindow) {
            Utils.showMessage(
                "Das Druckfenster wurde vom Browser blockiert.",
                "error"
            );
            return;
        }

        printWindow.document.write(`
            <!DOCTYPE html>
            <html lang="de">
            <head>
                <meta charset="UTF-8">

                <title>Arbeitsvorbereitung</title>

                <style>
                    body {
                        font-family: Arial, Helvetica, sans-serif;
                        margin: 24px;
                        color: #000;
                    }

                    h1 {
                        margin-bottom: 4px;
                    }

                    .date {
                        margin-bottom: 26px;
                    }

                    .machine-section {
                        margin-bottom: 32px;
                        page-break-inside: avoid;
                    }

                    h2 {
                        border-bottom: 2px solid #000;
                        padding-bottom: 5px;
                    }

                    table {
                        width: 100%;
                        border-collapse: collapse;
                    }

                    th,
                    td {
                        border: 1px solid #000;
                        padding: 9px;
                        text-align: left;
                    }

                    th {
                        background: #eee;
                    }

                    .checkbox-cell {
                        width: 70px;
                        text-align: center;
                        font-size: 22px;
                    }

                    @media print {
                        body {
                            margin: 10mm;
                        }
                    }
                </style>
            </head>

            <body>
                <h1>Arbeitsvorbereitung</h1>

                <div class="date">
                    ${now.toLocaleDateString("de-DE")}
                    ·
                    ${now.toLocaleTimeString("de-DE", {
                        hour: "2-digit",
                        minute: "2-digit"
                    })} Uhr
                    ·
                    ${this.items.length} Paletten
                </div>

                ${content}
            </body>
            </html>
        `);

        printWindow.document.close();

        printWindow.addEventListener("load", () => {
            printWindow.focus();
            printWindow.print();
        });
    },

    escapeHtml(value) {
        return String(value ?? "")
            .replaceAll("&", "&amp;")
            .replaceAll("<", "&lt;")
            .replaceAll(">", "&gt;")
            .replaceAll('"', "&quot;")
            .replaceAll("'", "&#039;");
    }

};
