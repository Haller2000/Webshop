let selectedComponents = {};
let totalPrice = 0;

function selectComponent(type, name, price, element) {
    // Ha ugyanazt az elemet választjuk újra, akkor visszaáll alapállapotba
    if (selectedComponents[type] && selectedComponents[type].name === name) {
        deselectComponent(type);
    } else {
        // Új elem kiválasztása: először visszavonjuk a korábbi kiválasztást
        deselectComponent(type);
        selectedComponents[type] = { name, price };
        element.classList.add("selected");
        totalPrice += price;
    }

    updateConfigList();
    updateTotalPrice();
}

function deselectComponent(type) {
    if (selectedComponents[type]) {
        const previousComponent = selectedComponents[type];
        totalPrice -= previousComponent.price;

        // Eltávolítjuk a kiemelést a korábban kiválasztott elemről
        const componentElements = document.querySelectorAll(`#${type.toLowerCase()} .component`);
        componentElements.forEach(el => el.classList.remove("selected"));

        delete selectedComponents[type];
    }
}

function updateConfigList() {
    const configList = document.getElementById("config-list");
    configList.innerHTML = Object.keys(selectedComponents)
        .map(type => `<li>${type}: ${selectedComponents[type].name}</li>`)
        .join("");
}


function updateTotalPrice() {
    document.getElementById("total-price").textContent = `Összes ár: ${totalPrice} Ft`;
}

function placeOrder() {
    const requiredComponents = ["CPU", "Memory", "Storage", "MotherBoard", "GPU"];
    const missingComponents = requiredComponents.filter(type => !selectedComponents[type]);

    if (missingComponents.length > 0) {
        alert(`Hiányzó alkatrészek: ${missingComponents.join(", ")}`);
    } else {
        alert("Sikeres megrendelés!");

        // Megrendelés után visszaállítunk mindent az alapállapotba
        Object.keys(selectedComponents).forEach(type => deselectComponent(type));
        selectedComponents = {};
        totalPrice = 0;
        updateConfigList();
        updateTotalPrice();
    }
}
