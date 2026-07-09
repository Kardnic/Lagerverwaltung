// ===================================
// Barcode Scanner
// ===================================

const Scanner = {

    scanner: null,
    running: false,

    async start() {

        if (this.running) return;

        const reader = document.getElementById("scanner");

        document.getElementById("scannerWrap").classList.remove("hidden");
        document.getElementById("stopScanBtn").classList.remove("hidden");

        this.scanner = new Html5Qrcode("scanner");

        this.running = true;

        try {

            await this.scanner.start(

                {
                    facingMode: "environment"
                },

                {
                    fps: 10,
                    qrbox: {
                        width: 280,
                        height: 120
                    }
                },

                (decodedText) => {

                    let barcode = Utils.cleanBarcode(decodedText);

                    document.getElementById("paletteInput").value = barcode;

                    Utils.showMessage("Palette erkannt: " + barcode);

                    this.stop();

                },

                () => {}

            );

        }
        catch (e) {

            console.error(e);

            Utils.showMessage("Scanner konnte nicht gestartet werden.", "error");

        }

    },

    async stop() {

        if (!this.running) return;

        try {

            await this.scanner.stop();
            await this.scanner.clear();

        }
        catch(e){}

        this.running = false;

        document.getElementById("scannerWrap").classList.add("hidden");
        document.getElementById("stopScanBtn").classList.add("hidden");

    },

    init(){

        document
            .getElementById("scanPaletteBtn")
            .addEventListener("click",()=>this.start());

        document
            .getElementById("stopScanBtn")
            .addEventListener("click",()=>this.stop());

    }

};
