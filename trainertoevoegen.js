var form = document.querySelector(".form-boxes");
if (!form)
    throw new Error("Form not found");
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
                isValid = /^[0-9]+$/.test(value);
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
        var resultsDiv = document.getElementById("trainerResults") || createResultsDiv();
        var trainerDiv_1 = document.createElement("div");
        trainerDiv_1.classList.add("trainer-entry");
        trainerDiv_1.innerHTML = Object.entries(trainerData)
            .map(function (_a) {
            var key = _a[0], value = _a[1];
            return "<p>".concat(key, ": ").concat(value, "</p>");
        })
            .join("");
        resultsDiv.appendChild(trainerDiv_1);
        var editBtn = document.createElement("button");
        editBtn.textContent = "Edit";
        editBtn.style.marginRight = "10px";
        // editBtn.addEventListener("click", () => editTrainer(trainerDiv, trainerData)); meot nog edit ding maken
        trainerDiv_1.appendChild(editBtn);
        var deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";
        deleteBtn.style.marginTop = "5px";
        deleteBtn.style.marginBottom = "12px";
        deleteBtn.addEventListener("click", function () { return trainerDiv_1.remove(); });
        trainerDiv_1.appendChild(deleteBtn);
        form.reset();
    }
    else {
        alert("Please fill in all fields correctly.");
    }
});
function createResultsDiv() {
    var div = document.createElement("div");
    div.id = "trainerResults";
    div.style.margin = "10px";
    div.style.borderTop = "2px solid #ccc";
    div.style.paddingTop = "10px";
    document.body.appendChild(div);
    return div;
}
