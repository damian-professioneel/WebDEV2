// trainings.ts

// TypeScript interface voor een training
interface Training {
    name: string;
    date: string;
    time: string;
    field: string;
    max: number;
}

// Array om trainingen in op te slaan
let trainings: Training[] = [];

// HTML elementen selecteren
const trainingForm = document.querySelector(".training-form") as HTMLFormElement;
const trainingContainer = document.querySelector(".trainings-container") as HTMLDivElement;

// Event listener voor formulier submit
trainingForm.addEventListener("submit", (e: Event) => {
    e.preventDefault();

    // Waarden uit het formulier halen
    const name = (document.getElementById("trainingName") as HTMLInputElement).value;
    const date = (document.getElementById("trainingDate") as HTMLInputElement).value;
    const time = (document.getElementById("trainingTime") as HTMLInputElement).value;
    const field = (document.getElementById("trainingField") as HTMLSelectElement).value;
    const max = parseInt((document.getElementById("maxParticipants") as HTMLInputElement).value);

    // Nieuw training-object maken
    const newTraining: Training = { name, date, time, field, max };

    // Toevoegen aan array
    trainings.push(newTraining);

    // UI updaten
    renderTrainings();

    // Formulier resetten
    trainingForm.reset();
});

// Functie om trainingen te renderen
function renderTrainings(): void {
    trainingContainer.innerHTML = "";

    trainings.forEach((t: Training) => {
        const div = document.createElement("div");
        div.classList.add("training-card");
        div.innerHTML = `
            <h3>${t.name}</h3>
            <p><strong>Datum:</strong> ${t.date}</p>
            <p><strong>Tijd:</strong> ${t.time}</p>
            <p><strong>Veld:</strong> ${t.field}</p>
            <p><strong>Max deelnemers:</strong> ${t.max}</p>
        `;
        trainingContainer.appendChild(div);
    });
}
