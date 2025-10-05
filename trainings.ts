type TrainingField = {
    id: string;
    label: string;
    type: "string" | "number";
};

type FormTraining = {
    id: string;
    naam: string;
    datum: string;
    tijd: string;
    veld: string;
    maxDeelnemers: number;
};

const FormTrainings = document.querySelector<HTMLFormElement>(".training-form");
if (!FormTrainings) throw new Error("Form not found");
FormTrainings.addEventListener("submit", (event: Event) => {
    event.preventDefault();
    const fields: TrainingField[] = [
        { id: "trainingName", label: "Naam", type: "string" },
        { id: "trainingDate", label: "Datum", type: "string" },
        { id: "trainingTime", label: "Tijd", type: "string" },
        { id: "trainingField", label: "Veld", type: "string" },
        { id: "maxParticipants", label: "Max Deelnemers", type: "number" }
    ];
    
    let allValid = true;
    const trainingData: FormTraining = {
        id: Date.now().toString(), // Generate unique ID
        naam: "",
        datum: "",
        tijd: "",
        veld: "",
        maxDeelnemers: 0
    };
    
    fields.forEach(field => {
        const input = document.getElementById(field.id) as HTMLInputElement | HTMLSelectElement;
        if (!input) return;
        
        const value = input.value.trim();
        let isValid = false;
        
        switch (field.type) {
            case "string":
                isValid = value.length > 0;
                break;
            case "number":
                isValid = /^[0-9]+$/.test(value) && parseInt(value) > 0;
                break;
        }
        
        if (isValid) {
            // Assign values to the correct properties
            switch (field.id) {
                case "trainingName":
                    trainingData.naam = value;
                    break;
                case "trainingDate":
                    trainingData.datum = value;
                    break;
                case "trainingTime":
                    trainingData.tijd = value;
                    break;
                case "trainingField":
                    trainingData.veld = value;
                    break;
                case "maxParticipants":
                    trainingData.maxDeelnemers = parseInt(value);
                    break;
            }
            input.style.borderColor = "";
        } else {
            allValid = false;
            input.style.borderColor = "red";
        }
    });
    
    if (allValid) {
        alert("Training toegevoegd!");
        const existingTrainings = JSON.parse(localStorage.getItem("trainings") || "[]");
        existingTrainings.push(trainingData);
        localStorage.setItem("trainings", JSON.stringify(existingTrainings));
        FormTrainings.reset();
    } else {
        alert("Training data is niet correct ingevuld.");
    }
});
// Function to load and display trainings from localStorage
function loadTrainings(): void {
    const trainings = JSON.parse(localStorage.getItem("trainings") || "[]");
    console.log("Loaded trainings:", trainings);
    // You can add code here to display trainings on the webpage
}

// Load trainings when page loads
document.addEventListener('DOMContentLoaded', () => {
    loadTrainings();
});
