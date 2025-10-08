import React from "react";
import './FrontendCSS/styles.css';

const Trainings: React.FC = () => {
  return (
    <div>
      <main>
        <h1>Training Management</h1>
        
        {/* Training toevoegen sectie */}
        <section className="training-section">
            <h2>Nieuwe Training Toevoegen</h2>
            <form className="training-form">
                <div className="form-group">
                    <label htmlFor="trainingName">Training Naam:</label>
                    <input type="text" id="trainingName" name="trainingName" required />
                </div>
                
                <div className="form-group">
                    <label htmlFor="trainingDate">Datum:</label>
                    <input type="date" id="trainingDate" name="trainingDate" required />
                </div>
                
                <div className="form-group">
                    <label htmlFor="trainingTime">Tijd:</label>
                    <input type="time" id="trainingTime" name="trainingTime" required />
                </div>
                
                <div className="form-group">
                    <label htmlFor="trainingField">Veld:</label>
                    <select id="trainingField" name="trainingField" required>
                        <option value="">Selecteer veld</option>
                        <option value="Veld 1">Veld 1</option>
                        <option value="Veld 2">Veld 2</option>
                        <option value="Veld 3">Veld 3</option>
                    </select>
                </div>
                
                <div className="form-group">
                    <label htmlFor="maxParticipants">Max Deelnemers:</label>
                    <input type="number" id="maxParticipants" name="maxParticipants" min="1" max="20" required />
                </div>
                
                <button type="submit" className="btn-primary">Training Toevoegen</button>
            </form>
        </section>

        {/* Trainingen overzicht met statische data */}
        <section className="training-section">
            <h2>Geplande Trainingen</h2>
            <div className="trainings-container">
            </div>
        </section>

        {/* Leden beheer */}
        <section className="training-section">
            <h2>Leden Beheer</h2>
            <div className="members-container">
                <h3>Nieuwe Lid Toevoegen</h3>
                <form className="member-form">
                    <div className="form-group">
                        <label htmlFor="memberFirstName">Voornaam:</label>
                        <input type="text" id="memberFirstName" name="memberFirstName" required />
                    </div>

                    <div className="form-group">
                        <label htmlFor="memberLastName">Achternaam:</label>
                        <input type="text" id="memberLastName" name="memberLastName" required />
                    </div>

                    <div className="form-group">
                        <label htmlFor="memberEmail">Email:</label>
                        <input type="email" id="memberEmail" name="memberEmail" required />
                    </div>
                    
                    <button type="submit" className="btn-primary">Lid Toevoegen</button>
                </form>
                
                <h3>Geregistreerde Leden</h3>
                <div className="members-list">
                    <div className="members-grid">
                        {/* Leden worden hier dynamisch toegevoegd */}
                    </div>
                </div>
            </div>
        </section>
    </main>
    </div>
  );
};

export default Trainings;
