
// ===================================
// Produktionsplanung importieren
// ===================================

const Planning = {

    currentImageFile: null,

    init() {
        this.bindElements();
        this.bindEvents();
    },

    bindElements() {
        this.dropZone = document.getElementById("dropZone");
        this.fileInput = document.getElementById("planungFileInput");
        this.selectFileBtn = document.getElementById("planungSelectFileBtn");
        this.previewCard = document.getElementById("planungPreviewCard");
        this.previewImage = document.getElementById("planungPreview");
        this.resultCard = document.getElementById("planungResultCard");
        this.resultBox = document.getElementById("planungResult");
        this.analyseBtn = document.getElementById("planungAnalyseBtn");
    },

    bindEvents() {
        this.selectFileBtn?.addEventListener("click", () => {
            this.fileInput?.click();
        });

        this.fileInput?.addEventListener("change", event => {
            const file = event.target.files?.[0];

            if (file) {
                this.loadImage(file);
            }
        });

        this.dropZone?.addEventListener("click", event => {
            if (event.target.closest("button")) return;
            this.fileInput?.click();
        });

        this.dropZone?.addEventListener("dragover", event => {
            event.preventDefault();
            this.dropZone.classList.add("drag");
        });

        this.dropZone?.addEventListener("dragleave", () => {
            this.dropZone.classList.remove("drag");
        });

        this.dropZone?.addEventListener("drop", event => {
            event.preventDefault();
            this.dropZone.classList.remove("drag");

            const file = Array.from(event.dataTransfer.files || [])
                .find(item => item.type.startsWith("image/"));

            if (!file) {
                Utils.showMessage(
                    "Bitte eine Bilddatei verwenden.",
                    "error"
                );
                return;
            }

            this.loadImage(file);
        });

        document.addEventListener("paste", event => {
            const planningView = document.getElementById("planungView");

            if (!planningView?.classList.contains("active")) {
                return;
            }

            const imageItem = Array.from(event.clipboardData?.items || [])
                .find(item => item.type.startsWith("image/"));

            if (!imageItem) return;

            const file = imageItem.getAsFile();

            if (file) {
                this.loadImage(file);
            }
        });

        this.analyseBtn?.addEventListener("click", () => {
            this.startAnalysis();
        });
    },

    loadImage(file) {
        if (!file.type.startsWith("image/")) {
            Utils.showMessage(
                "Die ausgewählte Datei ist kein Bild.",
                "error"
            );
            return;
        }

        this.currentImageFile = file;

        const reader = new FileReader();

        reader.addEventListener("load", () => {
            this.previewImage.src = reader.result;
            this.previewCard.classList.remove("hidden");
            this.resultCard.classList.remove("hidden");

            this.resultBox.innerHTML = `
                <div class="empty-state">
                    Screenshot geladen. Die OCR-Erkennung folgt im nächsten Schritt.
                </div>
            `;

            Utils.showMessage("Screenshot wurde geladen.");
        });

        reader.addEventListener("error", () => {
            Utils.showMessage(
                "Das Bild konnte nicht geladen werden.",
                "error"
            );
        });

        reader.readAsDataURL(file);
    },

    startAnalysis() {
        if (!this.currentImageFile) {
            Utils.showMessage(
                "Bitte zuerst einen Screenshot auswählen.",
                "error"
            );
            return;
        }

        this.resultBox.innerHTML = `
            <div class="empty-state">
                OCR-Erkennung ist noch nicht eingebaut.
            </div>
        `;

        Utils.showMessage(
            "Der Screenshot ist bereit für die Erkennung."
        );
    }

};
