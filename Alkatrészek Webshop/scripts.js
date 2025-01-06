document.addEventListener('DOMContentLoaded', function() {
    const compareButtons = document.querySelectorAll('.compare-btn');
    const comparisonSection = document.querySelector('.comparison-section');
    const errorSection = document.querySelector('.error-section'); 

    // A kiválasztott termékek tárolására szolgál
    const selectedItems = {
        processzorok: [],
        videokartyak: [],
        ramok: [],
        alaplapok: [],
        tarolok: [],
        tapeegysegek: [],
        hazak: []
    };

    let selectedCategory = null; // Elsőként beállítjuk, hogy nincs kategória kiválasztva

    // Hibaüzenet megjelenítése
    function showError(message) {
        errorSection.textContent = message;
        errorSection.style.display = 'block'; 
    }

    // Hibaüzenet eltüntetése
    function clearError() {
        errorSection.style.display = 'none';
    }

    // Minden egyes "Összehasonlítás" gombhoz eseményhozzárendelés
    compareButtons.forEach(button => {
        button.addEventListener('click', function() {
            const card = this.closest('.card');
            const category = card.closest('section').id;
            const productName = card.querySelector('h3').textContent;
            const productDescription = card.querySelector('p').textContent;
            const productPrice = parseFloat(card.querySelector('#price').textContent.replace(/\D/g, '')); //kiszedjük az ár-ból a számokat, vesszőt nem vesszük figyelembe

            // Ha még nem választottak kategóriát, akkor beállítjuk, hogy csak abból lehessen választani
            if (selectedCategory === null) {
                selectedCategory = category;
            }

            // Ha már kiválasztottak egy kategóriát, akkor csak azt a kategóriát lehet választani
            if (selectedCategory !== category) {
                showError('Csak egy kategóriából választhatsz termékeket!');
                return; 
            }

            // Ha még nincs kiválasztva termék ezen kategóriából
            if (!selectedItems[category].find(item => item.name === productName)) {
                selectedItems[category].push({ 
                    name: productName, 
                    description: productDescription,
                    price: productPrice 
                });

                // Létrehozza a termék kártyát az összehasonlításhoz
                const comparisonCard = document.createElement('div');
                comparisonCard.classList.add('card', 'comparison-card');
                comparisonCard.dataset.price = productPrice; 
                comparisonCard.innerHTML = ` 
                    <h3>${productName}</h3>
                    <p>${productDescription}</p>
                    <span id="price">${productPrice}</span> <!-- Az ár a span-ben szerepel -->
                    <button class="remove-btn">Eltávolítás</button>
                `;

                // Hozzáadja a kártyát az összehasonlításhoz
                comparisonSection.appendChild(comparisonCard);

                // Eltávolítás gomb 
                const removeButton = comparisonCard.querySelector('.remove-btn');
                removeButton.addEventListener('click', function() {
                    // Eltávolítja a terméket az összehasonlítandó termékek közül
                    comparisonSection.removeChild(comparisonCard);
                    selectedItems[category] = selectedItems[category].filter(item => item.name !== productName); // Törli a kiválasztott terméket a kategóriából
                    
                    clearError(); // Töröljük a hibaüzenetet
                    styleComparisonCards(); // Frissíti a színezést
                });

                // Árak alapján színbeállítások
                styleComparisonCards();

            } else {
                // Ha már kiválasztottunk egy terméket, akkor nem tudjuk hozzáadni újból
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
            if (allSelected > 3) {
                showError('Maximum 4 különböző terméket választhatsz.');
            } else {
                clearError();
            }
        });
    });
    // Színezés függvénye
    function styleComparisonCards() {
        const comparisonCards = document.querySelectorAll('.comparison-card');     
        // Ha nincs elég kártya, akkor nem színezünk
        if (comparisonCards.length === 0) return;
        // Az árak az összes kártyáról
        const prices = Array.from(comparisonCards).map(card => parseFloat(card.querySelector('#price').textContent.replace(/\D/g, ''))); // Árat a 'price' id-ből nyerjük, eltávolítjuk a nem számjegy karaktereket
        const maxPrice = Math.max(...prices); // A legnagyobb ár
        const minPrice = Math.min(...prices); // A legkisebb ár
        // Minden kártya színezése az ár alapján
        comparisonCards.forEach(card => {
            const cardPrice = parseFloat(card.querySelector('#price').textContent.replace(/\D/g, ''));

            // Színek beállítása
            if (cardPrice === maxPrice) {
                card.style.backgroundColor = 'red'; 
            } else if (cardPrice === minPrice) {
                card.style.backgroundColor = 'green'; 
            } else {
                card.style.backgroundColor = 'orange'; 
            }
        });
    }

        const detailButtons = document.querySelectorAll(".details-btn");
    
        detailButtons.forEach(button => {
            button.addEventListener("click", () => {
                const parentCard = button.closest(".card"); 
                const descriptionDiv = parentCard.querySelector(".description"); // A `description` div kiválasztása az adott kártyán belül
                
                if (descriptionDiv) {
                    const isHidden = descriptionDiv.style.display === "none" || descriptionDiv.style.display === "";
                    descriptionDiv.style.display = isHidden ? "block" : "none";
                }
            });
        });  
});

    

