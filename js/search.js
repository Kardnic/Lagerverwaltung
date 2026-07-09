// ===================================
// Suche / Übersicht
// ===================================

const Search = {

    allPalettes: [],

    init() {
        document.getElementById("searchOrderBtn").addEventListener("click", () => {
            this.searchOrder();
        });

        document.getElementById("overviewFilterInput").addEventListener("input", () => {
            this.renderOverview();
        });

        FirestoreService.onRealtimeUpdate(data => {
            this.allPalettes = data;
            this.renderOverview();
        });
    },

    async searchOrder() {
        const auftrag = document.getElementById("searchAuftragInput").value.trim();
        const position = document.getElementById("searchPositionInput").value.trim();

        const box = document.getElementById("searchResult");

        if (!auftrag || !position) {
            Utils.showMessage("Bitte Auftrag und Position eingeben.", "error");
            return;
        }

        const results = await FirestoreService.searchOrder(auftrag, position);

        box.classList.remove("hidden");

        if (!results.length) {
            box.innerHTML = `<div class="result-title">Keine Paletten gefunden</div>`;
            return;
        }

        let html = `
            <div class="result-title">
                Auftrag ${auftrag} / ${position}<br>
                ${results.length} Palette${results.length === 1 ? "" : "n"} im Lager
            </div>
        `;

        results.forEach(p => {
            html += `
                <div class="result-line">
                    <strong>${p.bereich}</strong> · Platz ${p.platzVon}${p.platzBis !== p.platzVon ? "–" + p.platzBis : ""}
                    <br>
                    Palette: ${p.palette}
                </div>
            `;
        });

        box.innerHTML = html;
    },

    renderOverview() {
        const box = document.getElementById("overviewList");
        const filter = document.getElementById("overviewFilterInput").value.trim().toLowerCase();

        let data = [...this.allPalettes];

        if (filter) {
            data = data.filter(p => {
                const text = `
                    ${p.auftrag}
                    ${p.position}
                    ${p.palette}
                    ${p.bereich}
                    ${p.platzVon}
                    ${p.platzBis}
                `.toLowerCase();

                return text.includes(filter);
            });
        }

        data.sort((a, b) => {
            if (a.bereich !== b.bereich) {
                return a.bereich.localeCompare(b.bereich);
            }

            return Number(a.platzVon) - Number(b.platzVon);
        });

        if (!data.length) {
            box.innerHTML = `<div class="empty-state">Keine belegten Lagerplätze gefunden.</div>`;
            return;
        }

        let html = `
            <table>
                <thead>
                    <tr>
                        <th>Bereich</th>
                        <th>Platz</th>
                        <th>Auftrag</th>
                        <th>Position</th>
                        <th>Palette</th>
                        <th>Eingelagert</th>
                    </tr>
                </thead>
                <tbody>
        `;

        data.forEach(p => {
            html += `
                <tr>
                    <td>${p.bereich}</td>
                    <td>${p.platzVon}${p.platzBis !== p.platzVon ? "–" + p.platzBis : ""}</td>
                    <td>${p.auftrag}</td>
                    <td>${p.position}</td>
                    <td>${p.palette}</td>
                    <td>${new Date(p.eingelagertAm).toLocaleString("de-DE")}</td>
                </tr>
            `;
        });

        html += `
                </tbody>
            </table>
        `;

        box.innerHTML = html;
    }

};
