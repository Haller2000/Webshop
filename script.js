// Objektum az alkatrészek tárolására
let selectedComponents = {};
let totalPrice = 0;

function loadComponents() {
    // A fájl beolvasása
    fetch('alkatreszek.txt')
        .then(response => response.text())
        .then(data => {
            // Parse-olás (szöveg feldolgozása)
            const categories = parseComponents(data);
            // Az alkatrészek kirajzolása
            renderCategories(categories);
        })
        .catch(err => console.error("Hiba a fájl beolvasásakor:", err));
}

// Az adatokat kategóriák szerint csoportosítja
function parseComponents(data) {
    const lines = data.trim().split('\n'); // Sorok szétválasztása
    const categories = {};

    lines.forEach(line => {
        const [category, name, price] = line.split('|'); // Kategória|Név|Ár
        if (!categories[category]) {
            categories[category] = [];
        }
        categories[category].push({
            name: name.trim(),
            price: parseInt(price.trim())
        });
    });

    return categories;
}

// Az alkatrészek kirajzolása a DOM-ba
function renderCategories(categories) {
    const container = document.getElementById('categories-container');
    container.innerHTML = ''; // Töröljük a meglévő elemeket

    Object.keys(categories).forEach(category => {
        // Kategória blokk
        const categoryDiv = document.createElement('div');
        categoryDiv.className = 'component-category';
        categoryDiv.id = category.toLowerCase();

        // HTML szerkezet
        categoryDiv.innerHTML = `
            <h3>${category}</h3>
            <div class="components">
                ${categories[category].map(component => `
                    <div class="component" 
                        onclick="selectComponent('${category}', '${component.name}', ${component.price}, this)">
                        ${component.name} - <strong>${component.price} Ft</strong>
                    </div>
                `).join('')}
            </div>
        `;
        container.appendChild(categoryDiv);
    });
}

// Alkatrész kiválasztása
function selectComponent(type, name, price, element) {
    // Ha ugyanazt az elemet választjuk újra
    if (selectedComponents[type] && selectedComponents[type].name === name) {
        deselectComponent(type);
    } else {
        // Előző kijelölés eltávolítása
        deselectComponent(type);
        // Új alkatrész kiválasztása
        selectedComponents[type] = { name, price };
        element.classList.add("selected");
        totalPrice += price;
    }

    updateConfigList();
    updateTotalPrice();
}

// Alkatrész kijelölésének megszüntetése
function deselectComponent(type) {
    if (selectedComponents[type]) {
        const previousComponent = selectedComponents[type];
        totalPrice -= previousComponent.price;

        // Korábbi elem kijelölésének eltávolítása
        const componentElements = document.querySelectorAll(`#${type.toLowerCase()} .component`);
        componentElements.forEach(el => el.classList.remove("selected"));

        delete selectedComponents[type];
    }
}

// Kiválasztott konfiguráció frissítése
function updateConfigList() {
    const configList = document.getElementById("config-list");
    configList.innerHTML = Object.keys(selectedComponents)
        .map(type => `<li>${type}: ${selectedComponents[type].name}</li>`)
        .join("");
}

// Az összár frissítése
function updateTotalPrice() {
    document.getElementById("total-price").textContent = `Összes ár: ${totalPrice} Ft`;
}

// Megrendelés leadása
function placeOrder() {
    const requiredComponents = ["CPU", "Memory", "Storage", "MotherBoard", "GPU"];
    const missingComponents = requiredComponents.filter(type => !selectedComponents[type]);

    if (missingComponents.length > 0) {
        alert(`Hiányzó alkatrészek: ${missingComponents.join(", ")}`);
    } else {
        alert("Sikeres megrendelés!");
        resetConfiguration();
    }
}

// Konfiguráció alaphelyzetbe állítása
function resetConfiguration() {
    Object.keys(selectedComponents).forEach(type => deselectComponent(type));
    selectedComponents = {};
    totalPrice = 0;
    updateConfigList();
    updateTotalPrice();
}

// Alkatrészek betöltése oldal betöltésekor
window.onload = loadComponents;
