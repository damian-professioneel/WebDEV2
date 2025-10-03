// script.ts
var banenopslag = [
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
var buttons = document.querySelectorAll("button.Delete");
var addknop = document.getElementById("knopvooradd");
function verwijderBaan(button) {
    button.parentElement != null ? button.parentElement.remove() : new Error("Button is er niet, weird?");
}
buttons.forEach(function (button) {
    button.addEventListener("click", function () { return verwijderBaan(button); });
});
addknop === null || addknop === void 0 ? void 0 : addknop.addEventListener("click", function () {
    var playerTeller = document.getElementById("spelersInput");
    var baanNummer = document.getElementById("baanInput");
    var spelType = document.getElementById("spelType");
    var errorMessage = "";
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
    var nieuweBaan = {
        baan: Number(baanNummer.value),
        spelers: Number(playerTeller.value),
        speltype: spelType.value,
        occupied: false
    };
    banenopslag.push(nieuweBaan);
    loadBaan();
});
function loadBaan() {
    var banenLijst = document.getElementById("banenLijst");
    if (!banenLijst) {
        alert("miauw");
        return;
    }
    banenLijst.innerHTML = "";
    banenopslag.forEach(function (baan) {
        var li = document.createElement("li");
        li.textContent = "Baan ".concat(baan.baan, " - ").concat(baan.speltype, " (").concat(baan.spelers, " spelers) ");
        var nieuweKnop = document.createElement("button");
        nieuweKnop.className = "Delete";
        nieuweKnop.textContent = "Delete";
        nieuweKnop.addEventListener("click", function () { return verwijderBaan(nieuweKnop); });
        li.appendChild(nieuweKnop);
        banenLijst.appendChild(li);
    });
}
