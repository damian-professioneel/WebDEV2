// TypeScript interface voor een training
interface Training {
    name: string;
    date: string;
    time: string;
    field: string;
    max: number;
}

interface Member {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
}
// Array om trainingen in op te slaan
let trainings: Training[] = [];

// HTML elementen selecteren
const trainingForm = document.querySelector(".training-form") as HTMLFormElement;
const trainingContainer = document.querySelector(".trainings-container") as HTMLDivElement;

// Debug: Check if elements are found
console.log("Training form found:", trainingForm);
console.log("Training container found:", trainingContainer);

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
    loadTrainings();
    
    // Scroll to the newly added training
    setTimeout(() => {
        scrollToLastTraining();
    }, 100); // Small delay to ensure DOM is updated
    
    alert("Training succesvol toegevoegd!");

    // Formulier resetten
    trainingForm.reset();
});

// Functie om trainingen te laden
function loadTrainings(): void {
    console.log("loadTrainings called with", trainings.length, "trainings");
    
    if (!trainingContainer) {
        console.error("Training container not found!");
        return;
    }
    
    trainingContainer.innerHTML = "";

    trainings.forEach((t: Training, index: number) => {
        const div = document.createElement("div");
        div.classList.add("training-card");
        div.innerHTML = `
            <h3>${t.name}</h3>
            <p><strong>Datum:</strong> ${t.date}</p>
            <p><strong>Tijd:</strong> ${t.time}</p>
            <p><strong>Veld:</strong> ${t.field}</p>
            <p><strong>Max deelnemers:</strong> ${t.max}</p>
            <button class="delete-btn" data-index="${index}">Delete</button>
        `;
        
        // Add event listener to delete button
        const deleteBtn = div.querySelector(".delete-btn") as HTMLButtonElement;
        deleteBtn.addEventListener("click", () => verwijderTraining(index));
        
        trainingContainer.appendChild(div);
    });
}

// Function to scroll to the last added training
function scrollToLastTraining(): void {
    const trainingCards = document.querySelectorAll('.training-card');
    if (trainingCards.length > 0) {
        const lastCard = trainingCards[trainingCards.length - 1];
        lastCard.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'center' 
        });
        
        // Optional: Add a highlight effect
        lastCard.classList.add('newly-added');
        setTimeout(() => {
            lastCard.classList.remove('newly-added');
        }, 2000);
    }
}
function verwijderTraining(index: number): void {
    try {
        // Remove training from array
        trainings.splice(index, 1);
        
        // Re-render the trainings list
        loadTrainings();
        
        alert("Training verwijderd!");
    } catch (error) {
        console.error("Error removing training:", error);
        alert("Er is een fout opgetreden bij het verwijderen van de training.");
    }
}
