document.addEventListener("DOMContentLoaded", () => {
    const compareLimit = 3; // Maximális összehasonlítási limit
    let compareList = []; // Tárolja az összehasonlításra kiválasztott termékeket
    let currentCategory = null; // Az éppen kiválasztott kategória
    const comparisonSection = document.querySelector(".comparison-section");
    const errorSection = document.querySelector(".error-section");

    // Összehasonlítás gomb működése
    document.querySelectorAll(".compare-btn").forEach(button => {
        button.addEventListener("click", () => {
            const card = button.parentElement;
            const title = card.querySelector("h3").textContent;
            const price = parseInt(card.getAttribute("data-price"), 10);
            const category = card.closest("section").id;

            // Ellenőrizzük, hogy az aktuális kategória egyezik-e
            if (currentCategory && currentCategory !== category) {
                // Ha más kategóriából választottak, töröljük az előző összehasonlításokat
                compareList = [];
                updateComparisonSection();
                resetButtons();
                currentCategory = category;
            }

            // Ha az összehasonlító lista üres, beállítjuk az aktuális kategóriát
            if (!currentCategory) currentCategory = category;

            if (compareList.some(item => item.title === title)) {
                // Eltávolítás az összehasonlításból
                removeFromComparison(title);
                button.textContent = "Összehasonlítás";
                button.style.backgroundColor = "#007BFF";
            } else {
                if (compareList.length >= compareLimit) {
                    showError(`Legfeljebb ${compareLimit} terméket hasonlíthatsz össze!`);
                    return;
                }
                // Hozzáadás az összehasonlításhoz
                compareList.push({ title, price });
                updateComparisonSection();
                button.textContent = "Eltávolítás";
                button.style.backgroundColor = "#dc3545";
            }
        });
    });

    function updateComparisonSection() {
        comparisonSection.innerHTML = "";
        if (compareList.length === 0) return;

        // Ár szerinti színezés logikája
        const prices = compareList.map(item => item.price);
        const minPrice = Math.min(...prices);
        const maxPrice = Math.max(...prices);

        compareList.forEach(item => {
            const div = document.createElement("div");
            div.classList.add("card");
            div.textContent = `${item.title} - ${item.price.toLocaleString()} Ft`;

            // Színezés
            if (item.price === minPrice) {
                div.style.backgroundColor = "lightgreen"; // Legolcsóbb
            } else if (item.price === maxPrice) {
                div.style.backgroundColor = "lightcoral"; // Legdrágább
            } else {
                div.style.backgroundColor = "orange"; // Köztes ár
            }

            // Eltávolítás gomb
            const removeBtn = document.createElement("button");
            removeBtn.textContent = "Eltávolítás";
            removeBtn.classList.add("remove-btn");
            removeBtn.addEventListener("click", () => {
                removeFromComparison(item.title);
                updateComparisonSection();
            });

            div.appendChild(document.createElement("br")); // Új sor
            div.appendChild(removeBtn);
            comparisonSection.appendChild(div);
        });
    }

    function removeFromComparison(title) {
        const index = compareList.findIndex(item => item.title === title);
        if (index !== -1) {
            compareList.splice(index, 1);

            // Frissítjük a megfelelő kártyán az összehasonlító gombot
            document.querySelectorAll(".compare-btn").forEach(button => {
                const card = button.parentElement;
                if (card.querySelector("h3").textContent === title) {
                    button.textContent = "Összehasonlítás";
                    button.style.backgroundColor = "#007BFF";
                }
            });

            // Ha az összehasonlító lista üres, visszaállítjuk az aktuális kategóriát
            if (compareList.length === 0) currentCategory = null;

            updateComparisonSection();
        }
    }

    function resetButtons() {
        document.querySelectorAll(".compare-btn").forEach(button => {
            button.textContent = "Összehasonlítás";
            button.style.backgroundColor = "#007BFF";
        });
    }

    function showError(message) {
        errorSection.textContent = message;
        setTimeout(() => {
            errorSection.textContent = "";
        }, 3000);
    }
});
