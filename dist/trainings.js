// Array om trainingen in op te slaan
let trainings = [];
let members = [];
// HTML elementen selecteren
const trainingForm = document.querySelector(".training-form");
const trainingContainer = document.querySelector(".trainings-container");
const memberForm = document.querySelector(".member-form");
const membersContainer = document.querySelector(".members-grid");
// Debug: Check if elements are found
console.log("Training form found:", trainingForm);
console.log("Training container found:", trainingContainer);
console.log("Member form found:", memberForm);
console.log("Members container found:", membersContainer);
// Initial load van trainingen
loadTrainings();
// Event listener voor formulier submit
trainingForm.addEventListener("submit", (e) => {
    e.preventDefault();
    // Waarden uit het formulier halen
    const name = document.getElementById("trainingName").value;
    const date = document.getElementById("trainingDate").value;
    const time = document.getElementById("trainingTime").value;
    const field = document.getElementById("trainingField").value;
    const max = parseInt(document.getElementById("maxParticipants").value);
    // Nieuw training-object maken
    const newTraining = { name, date, time, field, max };
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
function loadTrainings() {
    console.log("loadTrainings called with", trainings.length, "trainings");
    if (!trainingContainer) {
        console.error("Training container not found!");
        return;
    }
    trainingContainer.innerHTML = "";
    trainings.forEach((t, index) => {
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
        const editBtn = div.querySelector(".edit-btn");
        editBtn.addEventListener("click", () => bewerkTraining(index));
        // Add event listener to delete button
        const deleteBtn = div.querySelector(".delete-btn");
        deleteBtn.addEventListener("click", () => verwijderTraining(index));
        trainingContainer.appendChild(div);
    });
}
function bewerkTraining(index) {
    const training = trainings[index];
    // Populate form with existing training data
    document.getElementById("trainingName").value = training.name;
    document.getElementById("trainingDate").value = training.date;
    document.getElementById("trainingTime").value = training.time;
    document.getElementById("trainingField").value = training.field;
    document.getElementById("maxParticipants").value = training.max.toString();
}
// Function to scroll to the last added training
function scrollToLastTraining() {
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
function verwijderTraining(index) {
    try {
        // Remove training from array
        trainings.splice(index, 1);
        // Re-render the trainings list
        loadTrainings();
        alert("Training verwijderd!");
    }
    catch (error) {
        console.error("Error removing training:", error);
        alert("Er is een fout opgetreden bij het verwijderen van de training.");
    }
}
function loadMembers() {
    if (!membersContainer) {
        console.error("Members container not found!");
        return;
    }
    membersContainer.innerHTML = "";
    members.forEach((m, index) => {
        const div = document.createElement("div");
        div.classList.add("member-card");
        div.innerHTML = `
            <h3>${m.firstName} ${m.lastName}</h3>
            <p><strong>Email:</strong> ${m.email}</p>
            <button class="delete-btn" data-index="${index}">Delete</button>
        `;
        // Add event listener to delete button
        const deleteBtn = div.querySelector(".delete-btn");
        deleteBtn.addEventListener("click", () => verwijderMember(index));
        membersContainer.appendChild(div);
    });
}
// Event listener voor member formulier submit
memberForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const firstName = document.getElementById("memberFirstName").value;
    const lastName = document.getElementById("memberLastName").value;
    const email = document.getElementById("memberEmail").value;
    const newMember = { firstName, lastName, email };
    members.push(newMember);
    loadMembers();
    alert("Lid succesvol toegevoegd!");
    memberForm.reset();
});
function verwijderMember(index) {
    try {
        members.splice(index, 1);
        loadMembers();
        alert("Lid verwijderd!");
    }
    catch (error) {
        console.error("Error removing member:", error);
        alert("Er is een fout opgetreden bij het verwijderen van het lid.");
    }
}
