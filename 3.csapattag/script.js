document.addEventListener("DOMContentLoaded", function () {
    const alkatreszek = [
        {
            nev: "Alkatrész 1",
            rovidLeiras: "Ez egy rövid leírás.",
            hosszabbLeiras: "Ez egy hosszabb, részletes leírás az alkatrész tulajdonságairól."
        },
        {
            nev: "Alkatrész 2",
            rovidLeiras: "Ez egy másik rövid leírás.",
            hosszabbLeiras: "Ez egy másik hosszabb, részletes leírás az alkatrész tulajdonságairól."
        },
        // További alkatrészek...
    ];

    const alkatreszekContainer = document.querySelector(".alkatreszek");

    alkatreszek.forEach(alkatresz => {
        const alkatreszElem = document.createElement("div");
        alkatreszElem.classList.add("alkatresz");
        alkatreszElem.innerHTML = `
            <h3>${alkatresz.nev}</h3>
            <p>${alkatresz.rovidLeiras}</p>
            <button onclick="mutatHosszabbLeiras(this)">Részletek</button>
            <p class="hosszabb-leiras" style="display: none;">${alkatresz.hosszabbLeiras}</p>
        `;
        alkatreszekContainer.appendChild(alkatreszElem);
    });
});

function mutatHosszabbLeiras(button) {
    const leiras = button.nextElementSibling;
    if (leiras.style.display === "none") {
        leiras.style.display = "block";
    } else {
        leiras.style.display = "none";
    }
}
