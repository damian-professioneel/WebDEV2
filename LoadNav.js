fetch("nav.html")
    .then(response => response.text())
    .then(data => {
        document.getElementById("nav-placeholder").innerHTML = data;

        document.getElementById("logoutbtn").addEventListener("click", () => {
            window.location.href = "Login.html";
        });
    });