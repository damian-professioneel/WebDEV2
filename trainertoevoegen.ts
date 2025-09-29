type Field = {
    id: string;
    label: string;
    type: "string" | "number" | "email";
};


const form = document.querySelector<HTMLFormElement>(".form-boxes");
if (!form) throw new Error("Form not found");


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
        const resultsDiv = document.getElementById("trainerResults") || createResultsDiv();
        const trainerDiv = document.createElement("div");
        trainerDiv.classList.add("trainer-entry");

        trainerDiv.innerHTML = Object.entries(trainerData)
            .map(([key, value]) => `<p>${key}: ${value}</p>`)
            .join("");

        resultsDiv.appendChild(trainerDiv);


        const editBtn = document.createElement("button");
        editBtn.textContent = "Edit";
        editBtn.style.marginRight = "10px";
        // editBtn.addEventListener("click", () => editTrainer(trainerDiv, trainerData)); meot nog edit ding maken
        trainerDiv.appendChild(editBtn);


        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";
        deleteBtn.style.marginTop = "5px"; 
        deleteBtn.style.marginBottom = "12px"; 
        deleteBtn.addEventListener("click", () => trainerDiv.remove());
        trainerDiv.appendChild(deleteBtn);

        form.reset();
    } else {
        alert("Please fill in all fields correctly.");
    }
});


function createResultsDiv(): HTMLDivElement {
    const div = document.createElement("div");
    div.id = "trainerResults";
    div.style.margin = "10px";
    div.style.borderTop = "2px solid #ccc";
    div.style.paddingTop = "10px";
    document.body.appendChild(div);
    return div;
}
