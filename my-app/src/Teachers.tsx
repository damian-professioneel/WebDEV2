import React, { useState } from "react";

export const Teachers: React.FC = () => {
  const [teacherInfo, setTeacherInfo] = useState({
    naam: "",
    achternaam: "",
    telefoonnummer: "",
    email: "",
    wachtwoord: "",
    skillniveau: "",
  });

  const [teachers, setTeachers] = useState<typeof teacherInfo[]>([]);

  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setTeacherInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleDelete = (index: number) => {
    setTeachers((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const isEmpty = Object.values(teacherInfo).some((value) => value.trim() === "");
    if (isEmpty){
        alert("Niet alle velden zijn ingevuld");
        return;
    }

    const phoneNumber = teacherInfo.telefoonnummer;
    const phoneValid = /^06\d{8}$/;
    if (!phoneValid.test(phoneNumber)) {
      alert("Telefoonnummer moet beginnen met 06 en precies 10 cijfers bevatten zonder spaties.");
      return;
    }

    setTeachers((prev) => [...prev, teacherInfo]);

    setTeacherInfo({
      naam: "",
      achternaam: "",
      telefoonnummer: "",
      email: "",
      wachtwoord: "",
      skillniveau: "",
    });
  };

  return (
    <div className="form-container">
      <form className="form-boxes" onSubmit={handleSubmit}>
        <div className="forms">
          <label className="label-name" htmlFor="naam">Naam</label>
          <input
            type="text"
            id="naam"
            name="naam"
            value={teacherInfo.naam}
            onChange={handleChange}
          />
        </div>

        <div className="forms">
          <label className="label-name" htmlFor="achternaam">Achternaam</label>
          <input
            type="text"
            id="achternaam"
            name="achternaam"
            value={teacherInfo.achternaam}
            onChange={handleChange}
          />
        </div>

        <div className="forms">
          <label className="label-name" htmlFor="telefoonnummer">Telefoonnummer</label>
          <input
            type="text"
            id="telefoonnummer"
            name="telefoonnummer"
            value={teacherInfo.telefoonnummer}
            onChange={handleChange}
          />
        </div>

        <div className="forms">
          <label className="label-name" htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={teacherInfo.email}
            onChange={handleChange}
          />
        </div>

        <div className="forms">
          <label className="label-name" htmlFor="wachtwoord">Wachtwoord</label>
          <input
            type="password"
            id="wachtwoord"
            name="wachtwoord"
            value={teacherInfo.wachtwoord}
            onChange={handleChange}
          />
        </div>

        <div className="forms">
          <label className="label-name" htmlFor="skillniveau">Skill niveau</label>
          <select
            id="skillniveau"
            name="skillniveau"
            value={teacherInfo.skillniveau}
            onChange={handleChange}
          >
            <option value="">Selecteer een niveau</option>
            <option value="Beginner">Beginner</option>
            <option value="Gevorderd">Gevorderd</option>
            <option value="Professioneel">Professioneel</option>
          </select>
        </div>

        <button className="send-button" type="submit">Submit</button>
      </form>

      {teachers.length > 0 && (
        <div className="teacher-list">
          <h2>Alle Teachers:</h2>
          <ul>
            {teachers.map((teacher, index) => (
              <li key={index}>
                Naam : {teacher.naam} {teacher.achternaam} - Mail: {teacher.email} - Skill Niveau: {teacher.skillniveau}
                <button onClick={() => handleDelete(index)}>
                  Verwijder
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
