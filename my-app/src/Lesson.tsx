import React from 'react';
import './FrontendCSS/styles.css';

interface Lesson {
  start: string;
  end: string;
  lesson: string;
}

type Schedule = {
  [day: string]: Lesson[];
};

const schedule: Schedule = {
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

const days = ["Maandag", "Dinsdag", "Woensdag", "Donderdag", "Vrijdag"];

export const LessonTable: React.FC = () => {


 

  return (
    <table>
      <thead>
        <tr>
          {days.map((day) => (
            <th key={day}>{day}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        <tr>
          {days.map((day) => (
            <td key={day}>
              {schedule[day]?.map((lesson, idx) => {
                const key = `${day}-${idx}`;
                return (
                  <div className="lesson" key={key} style={{ marginBottom: 8 }}>
                    <span>
                      {lesson.start} - {lesson.end} {lesson.lesson}
                    </span>
                    <button>
                      
                    </button>
                  </div>
                );
              })}
            </td>
          ))}
        </tr>
      </tbody>
    </table>
  );
};

// Gebruik <LessonTable /> in je App of een andere component.