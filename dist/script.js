// script.ts
let banenopslag = [
    { baan: 1, spelers: 4, speltype: "padel", occupied: false },
    { baan: 2, spelers: 4, speltype: "padel", occupied: false },
    { baan: 3, spelers: 4, speltype: "padel", occupied: false },
    { baan: 4, spelers: 2, speltype: "padel", occupied: false },
    { baan: 5, spelers: 2, speltype: "padel", occupied: false },
    { baan: 6, spelers: 4, speltype: "tennis", occupied: false },
    { baan: 7, spelers: 4, speltype: "tennis", occupied: false },
    { baan: 8, spelers: 4, speltype: "tennis", occupied: false },
    { baan: 9, spelers: 2, speltype: "tennis", occupied: false },
    { baan: 10, spelers: 2, speltype: "tennis", occupied: false }
];
loadBaan();
const buttons = document.querySelectorAll("button.Delete");
const addknop = document.getElementById("knopvooradd");
function verwijderBaan(button) {
    button.parentElement != null ? button.parentElement.remove() : new Error("Button is er niet, weird?");
}
buttons.forEach((button) => {
    button.addEventListener("click", () => verwijderBaan(button));
});
addknop === null || addknop === void 0 ? void 0 : addknop.addEventListener("click", () => {
    const playerTeller = document.getElementById("spelersInput");
    const baanNummer = document.getElementById("baanInput");
    const spelType = document.getElementById("spelType");
    let errorMessage = "";
    if (baanNummer.value == "") {
        errorMessage += "* Baan nummer is niet ingevuld.\n";
    }
    if (playerTeller.value == "") {
        errorMessage += "* Aantal spelers is niet ingevuld.";
    }
    if (errorMessage != "") {
        alert(errorMessage);
        return;
    }
    const nieuweBaan = {
        baan: Number(baanNummer.value),
        spelers: Number(playerTeller.value),
        speltype: spelType.value,
        occupied: false
    };
    banenopslag.push(nieuweBaan);
    loadBaan();
});
function loadBaan() {
    const banenLijst = document.getElementById("banenLijst");
    if (!banenLijst) {
        alert("miauw");
        return;
    }
    banenLijst.innerHTML = "";
    banenopslag.forEach((baan) => {
        const li = document.createElement("li");
        li.textContent = `Baan ${baan.baan} - ${baan.speltype} (${baan.spelers} spelers) `;
        const nieuweKnop = document.createElement("button");
        nieuweKnop.className = "Delete";
        nieuweKnop.textContent = "Delete";
        nieuweKnop.addEventListener("click", () => verwijderBaan(nieuweKnop));
        li.appendChild(nieuweKnop);
        banenLijst.appendChild(li);
    });
}
