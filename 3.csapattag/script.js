document.addEventListener("DOMContentLoaded", function () {
    const alkatreszek = {
        "processzorok": [
            { nev: "Intel Core i9-13900K", rovidLeiras: "24 mag, 32 szál, 5.8 GHz", hosszabbLeiras: "Kiváló teljesítmény igényes alkalmazásokhoz." },
            { nev: "AMD Ryzen 9 7950X", rovidLeiras: "16 mag, 32 szál, 5.7 GHz", hosszabbLeiras: "Prémium processzor, kiváló ár-érték arány." },
            { nev: "Intel Core i7-13700K", rovidLeiras: "16 mag, 24 szál, 5.4 GHz", hosszabbLeiras: "Remek választás gamereknek és streamereknek." },
            { nev: "AMD Ryzen 7 7700X", rovidLeiras: "8 mag, 16 szál, 5.4 GHz", hosszabbLeiras: "Erős középkategóriás CPU, energiatakarékos." }
        ],
        "videokartyak": [
            { nev: "NVIDIA RTX 4090", rovidLeiras: "24 GB GDDR6X, Ray Tracing", hosszabbLeiras: "Ultra-realista grafika és AI funkciók." },
            { nev: "AMD Radeon RX 7900 XTX", rovidLeiras: "24 GB GDDR6, 4K Gaming", hosszabbLeiras: "Ideális 4K és VR játékokhoz." },
            { nev: "NVIDIA RTX 4080", rovidLeiras: "16 GB GDDR6X, DLSS 3.0", hosszabbLeiras: "Magas FPS és gyors válaszidő." },
            { nev: "AMD Radeon RX 6800 XT", rovidLeiras: "16 GB GDDR6, Infinity Cache", hosszabbLeiras: "Nagyszerű teljesítmény, jó ár." }
        ],
        "alaplapok": [
            { nev: "ASUS ROG Strix Z790-E", rovidLeiras: "Intel Z790, DDR5, PCIe 5.0", hosszabbLeiras: "Prémium alaplap, rengeteg extrával." },
            { nev: "MSI MPG B650 Tomahawk", rovidLeiras: "AMD B650, DDR5, USB 3.2", hosszabbLeiras: "Középkategóriás alaplap stabil teljesítménnyel." },
            { nev: "Gigabyte X670 AORUS Master", rovidLeiras: "AMD X670, DDR5, PCIe 5.0", hosszabbLeiras: "Csúcsminőségű alaplap az AMD rajongóknak." },
            { nev: "ASRock B550M Pro4", rovidLeiras: "AMD B550, DDR4, M.2", hosszabbLeiras: "Kedvező árú, megbízható alaplap." }
        ],
        "ramok": [
            { nev: "Corsair Vengeance DDR5", rovidLeiras: "32GB (2x16GB), 5200MHz", hosszabbLeiras: "Gyors és megbízható memória modul." },
            { nev: "G.Skill Trident Z5", rovidLeiras: "16GB (2x8GB), 6000MHz", hosszabbLeiras: "RGB világítás, extrém sebesség." },
            { nev: "Kingston Fury Beast DDR4", rovidLeiras: "16GB (2x8GB), 3200MHz", hosszabbLeiras: "Stabil és megbízható teljesítmény." },
            { nev: "Patriot Viper Steel", rovidLeiras: "32GB (2x16GB), 4000MHz", hosszabbLeiras: "Kitűnő választás overclockoláshoz." }
        ],
        "tarhelyek": [
            { nev: "Samsung 980 Pro SSD", rovidLeiras: "1TB, NVMe, PCIe 4.0", hosszabbLeiras: "Villámgyors sebesség, hosszú élettartam." },
            { nev: "WD Black SN850X", rovidLeiras: "2TB, NVMe, PCIe 4.0", hosszabbLeiras: "Kiváló tárhely gamereknek." },
            { nev: "Crucial MX500", rovidLeiras: "1TB, SATA, 3D NAND", hosszabbLeiras: "Megbízható SATA SSD kiváló ár-érték aránnyal." },
            { nev: "Seagate FireCuda 530", rovidLeiras: "4TB, NVMe, PCIe 4.0", hosszabbLeiras: "Nagy kapacitás, kiváló sebesség." }
        ],
        "tapegysegek": [
            { nev: "Corsair RM850x", rovidLeiras: "850W, 80+ Gold, moduláris", hosszabbLeiras: "Csendes, nagy hatékonyságú tápegység." },
            { nev: "Seasonic Focus GX-750", rovidLeiras: "750W, 80+ Gold, moduláris", hosszabbLeiras: "Megbízható teljesítmény, 10 év garancia." },
            { nev: "Cooler Master V750", rovidLeiras: "750W, 80+ Platinum, moduláris", hosszabbLeiras: "Prémium minőség, kiváló hűtés." },
            { nev: "EVGA SuperNOVA 1000 G5", rovidLeiras: "1000W, 80+ Gold, moduláris", hosszabbLeiras: "Erős tápegység nagy rendszerekhez." }
        ],
        "hazak": [
            { nev: "NZXT H510", rovidLeiras: "ATX, edzett üveg, USB-C", hosszabbLeiras: "Elegáns design, kiváló kábelmenedzsment." },
            { nev: "Cooler Master MasterBox", rovidLeiras: "Mid Tower, RGB, ATX", hosszabbLeiras: "RGB világítás, sok szellőzőnyílás." },
            { nev: "Fractal Design Meshify C", rovidLeiras: "ATX, hálós előlap, jó hűtés", hosszabbLeiras: "Kiváló szellőzés, modern megjelenés." },
            { nev: "Lian Li PC-O11 Dynamic", rovidLeiras: "ATX, dupla kamrás design", hosszabbLeiras: "Nagyszerű választás vízhűtéses rendszerekhez." }
        ]
    };

    let selectedItems = [];

    for (const [kategoriak, lista] of Object.entries(alkatreszek)) {
        const container = document.querySelector(`#${kategoriak} .alkatreszek`);
        lista.forEach(alkatresz => {
            const alkatreszElem = document.createElement("div");
            alkatreszElem.classList.add("alkatresz");
            alkatreszElem.innerHTML = `
                <h3>${alkatresz.nev}</h3>
                <p>${alkatresz.rovidLeiras}</p>
                <button onclick="mutatHosszabbLeiras(this)">Részletek</button>
                <button onclick="addToComparison('${kategoriak}', '${alkatresz.nev}')">Összehasonlít</button>
                <p class="hosszabb-leiras" style="display: none;">${alkatresz.hosszabbLeiras}</p>
            `;
            container.appendChild(alkatreszElem);
        });
    }

    window.mutatHosszabbLeiras = function(button) {
        const leiras = button.nextElementSibling;
        if (leiras.style.display === "none") {
            leiras.style.display = "block";
        } else {
            leiras.style.display = "none";
        }
    };

    window.addToComparison = function(kategoria, nev) {
        const item = alkatreszek[kategoria].find(alkatresz => alkatresz.nev === nev);
        if (selectedItems.length < 2) {
            selectedItems.push(item);
            updateComparison();
        } else {
            alert("Már két alkatrész van kiválasztva az összehasonlításhoz!");
        }
    };

    window.updateComparison = function() {
        const comparisonContainers = [document.getElementById("osszehasonlitott-1"), document.getElementById("osszehasonlitott-2")];
        comparisonContainers.forEach((container, index) => {
            container.innerHTML = selectedItems[index] ? `
                <h3>${selectedItems[index].nev}</h3>
                <p>${selectedItems[index].hosszabbLeiras}</p>
            ` : "<p>Válassz egy alkatrészt!</p>";
        });
    };

    window.resetComparison = function() {
        selectedItems = [];
        updateComparison();
    };
});