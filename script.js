const buttons = document.querySelectorAll("button");
//dit pakt elke button op de page drm aparte js file aangemaakt

buttons.forEach(button => {
  button.addEventListener("click", () => {
    const page = button.getAttribute("data-page");

    window.location.href = page;
  });
});

//loopt over de page en pakt de geselecteerde pagina, hoefde ni persee kan ook de info van de knop opslaan en naar de zelfde page brengen.