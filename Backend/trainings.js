// trainings.ts
// Array om trainingen in op te slaan
var trainings = [];
// Functie om trainingen uit localStorage te laden
function loadTrainings() {
    var storedTrainings = localStorage.getItem("trainings");
    if (storedTrainings) {
        trainings = JSON.parse(storedTrainings);
    }
}
// Functie om trainingen op te slaan in localStorage
function saveTrainings() {
    localStorage.setItem("trainings", JSON.stringify(trainings));
}
// HTML elementen selecteren
var trainingForm = document.querySelector(".training-form");
var trainingContainer = document.querySelector(".trainings-container");
// Event listener voor formulier submit
trainingForm.addEventListener("submit", function (e) {
    e.preventDefault();
    // Waarden uit het formulier halen
    var name = document.getElementById("trainingName").value;
    var date = document.getElementById("trainingDate").value;
    var time = document.getElementById("trainingTime").value;
    var field = document.getElementById("trainingField").value;
    var max = parseInt(document.getElementById("maxParticipants").value);
    // Nieuw training-object maken
    var newTraining = { name: name, date: date, time: time, field: field, max: max };
    // Toevoegen aan array
    trainings.push(newTraining);
    // Opslaan in localStorage
    saveTrainings();
    // UI updaten
    renderTrainings();
    // Formulier resetten
    trainingForm.reset();
    // Bevestiging tonen
    alert("Training succesvol toegevoegd!");
});
// Functie om trainingen te renderen
function renderTrainings() {
    trainingContainer.innerHTML = "";
    trainings.forEach(function (t) {
        var div = document.createElement("div");
        div.classList.add("training-card");
        div.innerHTML = "\n            <h3>".concat(t.name, "</h3>\n            <p><strong>Datum:</strong> ").concat(t.date, "</p>\n            <p><strong>Tijd:</strong> ").concat(t.time, "</p>\n            <p><strong>Veld:</strong> ").concat(t.field, "</p>\n            <p><strong>Max deelnemers:</strong> ").concat(t.max, "</p>\n        ");
        trainingContainer.appendChild(div);
    });
}
// Trainingen laden wanneer de pagina wordt geladen
document.addEventListener('DOMContentLoaded', function () {
    loadTrainings();
    renderTrainings();
});
