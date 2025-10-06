const schedule = {
    Maandag: [
        { start: "10:00", end: "11:00", lesson: "Tennis Beginners" },
        { start: "11:00", end: "12:00", lesson: "Padel Gevorderden" }
    ],
    Dinsdag: [
        { start: "10:00", end: "11:00", lesson: "Tennis Gevorderden" },
        { start: "11:00", end: "12:00", lesson: "Padel Beginners" }
    ],
    Woensdag: [
        { start: "10:00", end: "11:00", lesson: "Tennis Beginners" },
        { start: "11:00", end: "12:00", lesson: "Padel Gevorderden" }
    ],
    Donderdag: [
        { start: "10:00", end: "11:00", lesson: "Tennis Gevorderden" },
        { start: "11:00", end: "12:00", lesson: "Padel Beginners" }
    ],
    Vrijdag: [
        { start: "10:00", end: "11:00", lesson: "Tennis Beginners" },
        { start: "11:00", end: "12:00", lesson: "Padel Gevorderden" }
    ]
};
function renderSchedule(schedule) {
    for (var day in schedule) {
        const lessons = schedule[day];
        const cell = document.querySelector(`td[data-day="${day.toLowerCase()}"]`);
        if (!cell)
            continue;
        cell.innerHTML = "";
        lessons.forEach(lesson => {
            // const content = `${lesson.start} - ${lesson.end}   ${lesson.lesson}`
            // cell.textContent = content;
            const lessonDiv = document.createElement("div");
            lessonDiv.className = "lesson";
            const content = document.createElement("span");
            content.textContent = `${lesson.start} - ${lesson.end}   ${lesson.lesson}`;
            const button = document.createElement("button");
            button.textContent = "Aanmelden";
            button.style.marginLeft = "10px";
            button.style.backgroundColor = "#00ff22";
            button.addEventListener("click", () => {
                if (button.textContent === "Aanmelden") {
                    button.textContent = "Afmelden";
                    button.style.backgroundColor = "#ff4d4d";
                    alert(`Je hebt je aangemeld voor ${lesson.lesson} op ${day} van ${lesson.start} tot ${lesson.end}.`);
                }
                else {
                    button.textContent = "Aanmelden";
                    button.style.backgroundColor = "#00ff22";
                    alert(`Je hebt je afgemeld voor ${lesson.lesson} op ${day} van ${lesson.start} tot ${lesson.end}.`);
                }
            });
            lessonDiv.appendChild(content);
            lessonDiv.appendChild(button);
            cell.appendChild(lessonDiv);
        });
    }
}
renderSchedule(schedule);
