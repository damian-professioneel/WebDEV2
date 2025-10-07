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
}
// Array om trainingen in op te slaan
let trainings: Training[] = [];

let members: Member[] = [];

// HTML elementen selecteren
const trainingForm = document.querySelector(".training-form") as HTMLFormElement;
const trainingContainer = document.querySelector(".trainings-container") as HTMLDivElement;
const memberForm = document.querySelector(".member-form") as HTMLFormElement;
const membersContainer = document.querySelector(".members-grid") as HTMLDivElement;

// Debug: Check if elements are found
console.log("Training form found:", trainingForm);
console.log("Training container found:", trainingContainer);
console.log("Member form found:", memberForm);
console.log("Members container found:", membersContainer);
// Initial load van trainingen
loadTrainings();
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
            <div class="button-group">
                <button class="edit-btn" data-index="${index}">Edit</button>
                <button class="delete-btn" data-index="${index}">Delete</button>
            </div>
        `;
        
        // Add event listener to edit button
        const editBtn = div.querySelector(".edit-btn") as HTMLButtonElement;
        console.log("Edit button found:", editBtn);
        if (editBtn) {
            editBtn.addEventListener("click", () => bewerkTraining(index));
        }

        // Add event listener to delete button
        const deleteBtn = div.querySelector(".delete-btn") as HTMLButtonElement;
        console.log("Delete button found:", deleteBtn);
        if (deleteBtn) {
            deleteBtn.addEventListener("click", () => verwijderTraining(index));
        }
        
        trainingContainer.appendChild(div);
    });
}

function bewerkTraining(index: number): void {
    const training = trainings[index];
    // Populate form with existing training data
    (document.getElementById("trainingName") as HTMLInputElement).value = training.name;
    (document.getElementById("trainingDate") as HTMLInputElement).value = training.date;
    (document.getElementById("trainingTime") as HTMLInputElement).value = training.time;
    (document.getElementById("trainingField") as HTMLSelectElement).value = training.field;
    (document.getElementById("maxParticipants") as HTMLInputElement).value = training.max.toString();
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

function loadMembers(): void {
    if (!membersContainer) {
        console.error("Members container not found!");
        return;
    }
    membersContainer.innerHTML = "";
    members.forEach((m: Member, index: number) => {
        const div = document.createElement("div");
        div.classList.add("member-card");
        div.innerHTML = `
            <h3>${m.firstName} ${m.lastName}</h3>
            <p><strong>Email:</strong> ${m.email}</p>
            <button class="delete-btn" data-index="${index}">Delete</button>
        `;
        // Add event listener to delete button
        const deleteBtn = div.querySelector(".delete-btn") as HTMLButtonElement;
        deleteBtn.addEventListener("click", () => verwijderMember(index));
        membersContainer.appendChild(div);
    });
}
// Event listener voor member formulier submit
memberForm.addEventListener("submit", (e: Event) => {
    e.preventDefault();
    const firstName = (document.getElementById("memberFirstName") as HTMLInputElement).value;
    const lastName = (document.getElementById("memberLastName") as HTMLInputElement).value;
    const email = (document.getElementById("memberEmail") as HTMLInputElement).value;
    const newMember: Member = { firstName, lastName, email };
    members.push(newMember);
    loadMembers();
    alert("Lid succesvol toegevoegd!");
    memberForm.reset();
});

function verwijderMember(index: number): void {
    try {
        members.splice(index, 1);
        loadMembers();
        alert("Lid verwijderd!");
    } catch (error) {
        console.error("Error removing member:", error);
        alert("Er is een fout opgetreden bij het verwijderen van het lid.");
    }
}
