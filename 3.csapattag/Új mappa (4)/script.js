document.addEventListener('DOMContentLoaded', function() {
    const compareButtons = document.querySelectorAll('.compare-btn');
    const comparisonSection = document.querySelector('.comparison-section');
    const errorSection = document.querySelector('.error-section'); // Hibaüzenet szekció

    // Objektum a kiválasztott termékek tárolására
    const selectedItems = {
        processzorok: [],
        videokartyak: [],
        ramok: [],
        alaplapok: [],
        tarolok: [],
        tapeegysegek: [],
        hazak: []
    };

    let selectedCategory = null; // Nyomon követi, hogy melyik kategóriából választottak

    // Hibaüzenet megjelenítése
    function showError(message) {
        errorSection.textContent = message;
        errorSection.style.display = 'block'; // Hibaüzenet megjelenítése
    }

    // Hibaüzenet eltüntetése
    function clearError() {
        errorSection.style.display = 'none'; // Hibaüzenet eltüntetése
    }

    // Minden egyes "Összehasonlítás" gombhoz eseményhozzárendelés
    compareButtons.forEach(button => {
        button.addEventListener('click', function() {
            const card = this.closest('.card');
            const category = card.closest('section').id; // Kategória (pl. processzorok, videokártyák)
            const productName = card.querySelector('h3').textContent;
            const productDescription = card.querySelector('p').textContent;

            // Ha még nem választottak kategóriát, akkor beállítjuk
            if (selectedCategory === null) {
                selectedCategory = category;
            }

            // Ha már kiválasztottak egy kategóriát, akkor csak azt a kategóriát lehet választani
            if (selectedCategory !== category) {
                showError('Csak egy kategóriából választhatsz termékeket!');
                return; // Megakadályozza a választást
            }


            



            // Ha még nincs kiválasztva termék ezen kategóriából
            if (!selectedItems[category].find(item => item.name === productName)) {
                selectedItems[category].push({ 
                    name: productName, 
                    description: productDescription
                });

                // Létrehozza a termék kártyát az összehasonlításhoz
                const comparisonCard = document.createElement('div');
                comparisonCard.classList.add('card', 'comparison-card');
                comparisonCard.dataset.category = category;
                comparisonCard.innerHTML = `
                    <h3>${productName}</h3>
                    <p>${productDescription}</p>
                    <button class="remove-btn">Eltávolítás</button>
                `;

                // Hozzáadja a kártyát az összehasonlításhoz
                comparisonSection.appendChild(comparisonCard);

                // Eltávolítás gomb eseménykezelője
                const removeButton = comparisonCard.querySelector('.remove-btn');
                removeButton.addEventListener('click', function() {
                    // Eltávolítja a terméket az összehasonlítandó termékek közül
                    comparisonSection.removeChild(comparisonCard);
                    selectedItems[category] = selectedItems[category].filter(item => item.name !== productName); // Törli a kiválasztott terméket a kategóriából
                    
                    clearError(); // Töröljük a hibaüzenetet
                    
                });
            } else {
                // Ha már kiválasztottak egy terméket, akkor hozzáadja az új terméket
                showError('Ez a termék már hozzá van adva az összehasonlításhoz!');
            }

            document.querySelectorAll('.extra-action').forEach(button => {
                button.addEventListener('click', function() {
                    const productName = this.closest('.product-card').querySelector('span').textContent;
                    alert("További információ a termékről: " + productName);
                });
            });
           



            // Ellenőrizzük, hogy a felhasználó már ki van választva minden kategóriából
            const allSelected = Object.values(selectedItems).flat().length;

            // Ha túl sok termék van választva
            if (allSelected > 4) {
                showError('Maximum 5 különböző terméket választhatsz.');
            } else {
                clearError();
            }
        });
    });
});
