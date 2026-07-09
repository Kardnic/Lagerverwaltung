// ===================================
// UI Service
// ===================================

const UI = {

    init() {
        this.setupNavigation();
        this.setupDarkMode();
    },

    setupNavigation() {
        const buttons = document.querySelectorAll(".nav-btn");
        const views = document.querySelectorAll(".view");

        buttons.forEach(button => {
            button.addEventListener("click", () => {
                const target = button.dataset.view;

                views.forEach(view => {
                    view.classList.toggle("active", view.id === target);
                });

                buttons.forEach(btn => {
                    btn.classList.toggle("active", btn.dataset.view === target);
                });
            });
        });

        if (window.innerWidth >= 800) {
            this.showView("sucheView");
        } else {
            this.showView("einlagernView");
        }
    },

    showView(viewId) {
        document.querySelectorAll(".view").forEach(view => {
            view.classList.toggle("active", view.id === viewId);
        });

        document.querySelectorAll(".nav-btn").forEach(btn => {
            btn.classList.toggle("active", btn.dataset.view === viewId);
        });
    },

    setupDarkMode() {
        const btn = document.getElementById("toggleDarkBtn");

        if (localStorage.getItem("darkMode") === "1") {
            document.body.classList.add("dark");
        }

        if (!btn) return;

        btn.addEventListener("click", () => {
            document.body.classList.toggle("dark");
            localStorage.setItem(
                "darkMode",
                document.body.classList.contains("dark") ? "1" : "0"
            );
        });
    },

    fillAreaSelect(selectId) {
        const select = document.getElementById(selectId);
        if (!select) return;

        select.innerHTML = "";

        CONFIG.bereiche.forEach(bereich => {
            const option = document.createElement("option");
            option.value = bereich.name;
            option.textContent = bereich.name;
            select.appendChild(option);
        });
    },

    fillPlaceSelect(selectId, bereichName) {
        const select = document.getElementById(selectId);
        if (!select) return;

        const bereich = CONFIG.bereiche.find(b => b.name === bereichName);
        if (!bereich) return;

        select.innerHTML = "";

        Utils.range(1, bereich.plaetze).forEach(nr => {
            const option = document.createElement("option");
            option.value = nr;
            option.textContent = nr;
            select.appendChild(option);
        });
    },

    initPlaceDropdowns(bereichId, platzId) {
        const bereichSelect = document.getElementById(bereichId);
        const platzSelect = document.getElementById(platzId);

        if (!bereichSelect || !platzSelect) return;

        this.fillAreaSelect(bereichId);
        this.fillPlaceSelect(platzId, bereichSelect.value);

        bereichSelect.addEventListener("change", () => {
            this.fillPlaceSelect(platzId, bereichSelect.value);
        });
    }

};
