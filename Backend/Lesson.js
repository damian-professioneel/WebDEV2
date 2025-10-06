var schedule = {
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
    var _loop_1 = function () {
        var lessons = schedule[day];
        var cell = document.querySelector("td[data-day=\"".concat(day.toLowerCase(), "\"]"));
        if (!cell)
            return "continue";
        cell.innerHTML = "";
        lessons.forEach(function (lesson) {
            // const content = `${lesson.start} - ${lesson.end}   ${lesson.lesson}`
            // cell.textContent = content;
            var lessonDiv = document.createElement("div");
            lessonDiv.className = "lesson";
            var content = document.createElement("span");
            content.textContent = "".concat(lesson.start, " - ").concat(lesson.end, "   ").concat(lesson.lesson);
            var button = document.createElement("button");
            button.textContent = "Aanmelden";
            button.style.marginLeft = "10px";
            button.style.backgroundColor = "#00ff22";
            button.addEventListener("click", function () {
                if (button.textContent === "Aanmelden") {
                    button.textContent = "Afmelden";
                    button.style.backgroundColor = "#ff4d4d";
                    alert("Je hebt je aangemeld voor ".concat(lesson.lesson, " op ").concat(day, " van ").concat(lesson.start, " tot ").concat(lesson.end, "."));
                }
                else {
                    button.textContent = "Aanmelden";
                    button.style.backgroundColor = "#00ff22";
                    alert("Je hebt je afgemeld voor ".concat(lesson.lesson, " op ").concat(day, " van ").concat(lesson.start, " tot ").concat(lesson.end, "."));
                }
            });
            lessonDiv.appendChild(content);
            lessonDiv.appendChild(button);
            cell.appendChild(lessonDiv);
        });
    };
    for (var day in schedule) {
        _loop_1();
    }
}
renderSchedule(schedule);
