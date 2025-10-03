// --- Data Persistence Functions ---
// 1. Define the initial hardcoded data for the very first load
var initialTrainers = [
    {
        Naam: "John",
        Achternaam: "Doe",
        Telefoonnummer: "0612345678",
        Email: "john.doe@example.com",
        Wachtwoord: "secret123",
        "Skill niveau": "Expert"
    }
];
// 2. Load data from localStorage, falling back to initialTrainers
// Note: JSON.parse(null) is not an error, but 'null' coalescing is cleaner.
var trainers = JSON.parse(localStorage.getItem('trainersData') || 'null') || initialTrainers;
// 3. Function to save the current trainers array to localStorage
function saveTrainers() {
    localStorage.setItem('trainersData', JSON.stringify(trainers));
}
// --- Application Logic (Modified) ---
var form = document.querySelector(".form-boxes");
if (!form)
    throw new Error("Form not found");
function renderTrainers() {
    var resultsDiv = document.getElementById("trainerResults");
    if (!resultsDiv) {
        resultsDiv = document.createElement("div");
        resultsDiv.id = "trainerResults";
        document.body.appendChild(resultsDiv);
    }
    resultsDiv.innerHTML = "";
    trainers.forEach(function (trainer, index) {
        var trainerDiv = document.createElement("div");
        trainerDiv.classList.add("trainer-entry");
        trainerDiv.innerHTML = Object.entries(trainer)
            .map(function (_a) {
            var key = _a[0], value = _a[1];
            return "<p><strong>".concat(key, ":</strong> ").concat(value, "</p>");
        })
            .join("");
        var editBtn = document.createElement("button");
        editBtn.textContent = "Edit";
        editBtn.style.marginRight = "10px";
        editBtn.addEventListener("click", function () {
            alert("Edit not implemented yet for trainer " + (index + 1));
        });
        // Delete button
        var deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";
        deleteBtn.addEventListener("click", function () {
            // Use filter to create a new array without the deleted item
            // and reassign trainers. This avoids issues with stale index closures.
            // A simpler splice approach:
            trainers.splice(index, 1);
            saveTrainers(); // <-- SAVE CHANGE
            renderTrainers();
        });
        trainerDiv.appendChild(editBtn);
        trainerDiv.appendChild(deleteBtn);
        resultsDiv.appendChild(trainerDiv);
    });
}
form.addEventListener("submit", function (event) {
    event.preventDefault();
    var fields = [
        { id: "naamTrainer", label: "Naam", type: "string" },
        { id: "achternaamTrainer", label: "Achternaam", type: "string" },
        { id: "telNummer", label: "Telefoonnummer", type: "number" },
        { id: "email", label: "Email", type: "email" },
        { id: "Wachtwoord", label: "Wachtwoord", type: "string" },
        { id: "skill", label: "Skill niveau", type: "string" }
    ];
    var allValid = true;
    var trainerData = {};
    fields.forEach(function (field) {
        var input = document.getElementById(field.id);
        if (!input)
            return;
        var value = input.value.trim();
        var isValid = false;
        switch (field.type) {
            case "string":
                isValid = value.length > 0;
                break;
            case "number":
                // Added a length check for typical phone numbers (8-15 digits)
                isValid = /^[0-9]+$/.test(value) && value.length >= 8 && value.length <= 15;
                break;
            case "email":
                isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
                break;
        }
        if (isValid) {
            trainerData[field.label] = value;
            input.style.borderColor = "";
        }
        else {
            allValid = false;
            input.style.borderColor = "red";
        }
    });
    if (allValid) {
        trainers.push(trainerData);
        saveTrainers(); // <-- SAVE CHANGE
        renderTrainers();
        form.reset();
    }
    else {
        alert("Please fill in all fields correctly.");
    }
});
// Call renderTrainers() on load to display the data loaded from localStorage
renderTrainers();
