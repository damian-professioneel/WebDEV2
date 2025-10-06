type Field = {
    id: string;
    label: string;
    type: "string" | "number" | "email";
};


let trainers: Record<string, string>[] = [
    {
        Naam: "John",
        Achternaam: "Doe",
        Telefoonnummer: "0612345678",
        Email: "john.doe@example.com",
        Wachtwoord: "secret123",
        "Skill niveau": "Expert"
    }
];

const form = document.querySelector<HTMLFormElement>(".form-boxes");
if (!form) throw new Error("Form not found");


function renderTrainers(): void {
    let resultsDiv = document.getElementById("trainerResults");
    if (!resultsDiv) {
        resultsDiv = document.createElement("div");
        resultsDiv.id = "trainerResults";
        document.body.appendChild(resultsDiv);
    }

    resultsDiv.innerHTML = "";

    trainers.forEach((trainer, index) => {
        const trainerDiv = document.createElement("div");
        trainerDiv.classList.add("trainer-entry");

        trainerDiv.innerHTML = Object.keys(trainer)
            .map(key => `<p><strong>${key}:</strong> ${(trainer as any)[key]}</p>`)
            .join("");

        const editBtn = document.createElement("button");
        editBtn.textContent = "Edit";
        editBtn.style.marginRight = "10px";
        editBtn.addEventListener("click", () => {
            alert("Edit not implemented yet for trainer " + (index + 1));
        });

        // Delete button
        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";
        deleteBtn.addEventListener("click", () => {
            trainers.splice(index, 1);
            renderTrainers();
        });

        trainerDiv.appendChild(editBtn);
        trainerDiv.appendChild(deleteBtn);
        resultsDiv.appendChild(trainerDiv);
    });
}

form.addEventListener("submit", (event: Event) => {
    event.preventDefault();

    const fields: Field[] = [
        { id: "naamTrainer", label: "Naam", type: "string" },
        { id: "achternaamTrainer", label: "Achternaam", type: "string" },
        { id: "telNummer", label: "Telefoonnummer", type: "number" },
        { id: "email", label: "Email", type: "email" },
        { id: "Wachtwoord", label: "Wachtwoord", type: "string" },
        { id: "skill", label: "Skill niveau", type: "string" }
    ];

    let allValid = true;
    const trainerData: Record<string, string> = {};

    fields.forEach(field => {
        const input = document.getElementById(field.id) as HTMLInputElement | null;
        if (!input) return;

        const value = input.value.trim();
        let isValid = false;

        switch (field.type) {
            case "string":
                isValid = value.length > 0;
                break;
            case "number":
                isValid = /^[0-9]+$/.test(value);
                break;
            case "email":
                isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
                break;
        }

        if (isValid) {
            trainerData[field.label] = value;
            input.style.borderColor = "";
        } else {
            allValid = false;
            input.style.borderColor = "red";
        }
    });

    if (allValid) {
        trainers.push(trainerData)
        renderTrainers();
        form.reset();
    } else {
        alert("Please fill in all fields correctly.");
    }
});

renderTrainers();