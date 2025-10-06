function createAccountForm() {
    const form = document.createElement("form");
    form.id = "accountForm";
    form.style.margin = "30px 0";
    const firstnameLabel = document.createElement("label");
    firstnameLabel.textContent = "Voornaam:";
    const firstnameInput = document.createElement("input");
    firstnameInput.type = "text";
    firstnameInput.name = "firstname";
    firstnameInput.required = true;
    const lastnameLabel = document.createElement("label");
    lastnameLabel.textContent = "Achternaam:";
    const lastnameInput = document.createElement("input");
    lastnameInput.type = "text";
    lastnameInput.name = "lastname";
    lastnameInput.required = true;
    const phonenumberLabel = document.createElement("label");
    phonenumberLabel.textContent = "Telefoonnummer:";
    const phonenumberInput = document.createElement("input");
    phonenumberInput.type = "tel";
    phonenumberInput.name = "phonenumber";
    phonenumberInput.required = true;
    const emailLabel = document.createElement("label");
    emailLabel.textContent = "Email:";
    const emailInput = document.createElement("input");
    emailInput.type = "email";
    emailInput.name = "email";
    emailInput.required = true;
    const typeLabel = document.createElement("label");
    typeLabel.textContent = "Account Type:";
    const typeSelect = document.createElement("select");
    typeSelect.name = "type";
    ["Bestuurslid", "Trainer", "Lid"].forEach(t => {
        const option = document.createElement("option");
        option.value = t;
        option.textContent = t;
        typeSelect.appendChild(option);
    });
    typeSelect.required = true;
    const submitButton = document.createElement("button");
    submitButton.type = "submit";
    submitButton.textContent = "Create Account";
    form.appendChild(firstnameLabel);
    form.appendChild(firstnameInput);
    form.appendChild(document.createElement("br"));
    form.appendChild(lastnameLabel);
    form.appendChild(lastnameInput);
    form.appendChild(document.createElement("br"));
    form.appendChild(phonenumberLabel);
    form.appendChild(phonenumberInput);
    form.appendChild(document.createElement("br"));
    form.appendChild(emailLabel);
    form.appendChild(emailInput);
    form.appendChild(document.createElement("br"));
    form.appendChild(typeLabel);
    form.appendChild(typeSelect);
    form.appendChild(document.createElement("br"));
    form.appendChild(submitButton);
    form.addEventListener("submit", (event) => {
        event.preventDefault();
        const newAccount = {
            username: `${firstnameInput.value} ${lastnameInput.value}`,
            email: emailInput.value,
            type: typeSelect.value
        };
        console.log("Account Created:", newAccount);
        alert(`Account for ${newAccount.username} created successfully!`);
        form.reset();
    });
    document.body.appendChild(form);
}
window.onload = function () {
    createAccountForm();
};
