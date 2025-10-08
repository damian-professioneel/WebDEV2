import React, { useState, useEffect, useRef } from "react";
import './FrontendCSS/styles.css';

// TypeScript interfaces
interface Training {
    name: string;
    date: string;
    time: string;
    field: string;
    max: number;
}

interface Member {
    firstName: string;
    lastName: string;
    email: string;
}

const Trainings: React.FC = () => {
    // State voor trainingen en leden
    const [trainings, setTrainings] = useState<Training[]>([]);
    const [members, setMembers] = useState<Member[]>([]);
    
    // State voor training formulier
    const [trainingForm, setTrainingForm] = useState({
        name: '',
        date: '',
        time: '',
        field: '',
        max: 1
    });
    
    // State voor member formulier
    const [memberForm, setMemberForm] = useState({
        firstName: '',
        lastName: '',
        email: ''
    });

    // State voor edit mode
    const [editingTrainingIndex, setEditingTrainingIndex] = useState<number | null>(null);
    
    // Ref voor scrolling naar nieuwe training
    const trainingsContainerRef = useRef<HTMLDivElement>(null);

    // Load data from sessionStorage on component mount
    useEffect(() => {
        const savedTrainings = sessionStorage.getItem('trainings');
        const savedMembers = sessionStorage.getItem('members');
        
        if (savedTrainings) {
            setTrainings(JSON.parse(savedTrainings));
        }
        if (savedMembers) {
            setMembers(JSON.parse(savedMembers));
        }
    }, []);

    // Save to sessionStorage whenever data changes
    useEffect(() => {
        sessionStorage.setItem('trainings', JSON.stringify(trainings));
    }, [trainings]);

    useEffect(() => {
        sessionStorage.setItem('members', JSON.stringify(members));
    }, [members]);

    // Handle training form input changes
    const handleTrainingInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setTrainingForm(prev => ({
            ...prev,
            [name]: name === 'max' ? parseInt(value) || 1 : value
        }));
    };

    // Handle member form input changes
    const handleMemberInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setMemberForm(prev => ({
            ...prev,
            [name]: value
        }));
    };

    // Submit training form
    const handleTrainingSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        if (editingTrainingIndex !== null) {
            // Update existing training
            const updatedTrainings = [...trainings];
            updatedTrainings[editingTrainingIndex] = {
                name: trainingForm.name,
                date: trainingForm.date,
                time: trainingForm.time,
                field: trainingForm.field,
                max: trainingForm.max
            };
            setTrainings(updatedTrainings);
            setEditingTrainingIndex(null);
            alert("Training succesvol bijgewerkt!");
        } else {
            // Add new training
            const newTraining: Training = {
                name: trainingForm.name,
                date: trainingForm.date,
                time: trainingForm.time,
                field: trainingForm.field,
                max: trainingForm.max
            };
            
            setTrainings(prev => [...prev, newTraining]);
            alert("Training succesvol toegevoegd!");
            
            // Scroll to newly added training
            setTimeout(() => {
                scrollToLastTraining();
            }, 100);
        }
        
        // Reset form
        setTrainingForm({
            name: '',
            date: '',
            time: '',
            field: '',
            max: 1
        });
    };

    // Submit member form
    const handleMemberSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        const newMember: Member = {
            firstName: memberForm.firstName,
            lastName: memberForm.lastName,
            email: memberForm.email
        };
        
        setMembers(prev => [...prev, newMember]);
        alert("Lid succesvol toegevoegd!");
        
        // Reset form
        setMemberForm({
            firstName: '',
            lastName: '',
            email: ''
        });
    };

    // Edit training function
    const bewerkTraining = (index: number) => {
        const training = trainings[index];
        setTrainingForm({
            name: training.name,
            date: training.date,
            time: training.time,
            field: training.field,
            max: training.max
        });
        setEditingTrainingIndex(index);
    };

    // Delete training function
    const verwijderTraining = (index: number) => {
        if (window.confirm("Weet je zeker dat je deze training wilt verwijderen?")) {
            setTrainings(prev => prev.filter((_, i) => i !== index));
            alert("Training verwijderd!");
        }
    };

    // Delete member function
    const verwijderMember = (index: number) => {
        if (window.confirm("Weet je zeker dat je dit lid wilt verwijderen?")) {
            setMembers(prev => prev.filter((_, i) => i !== index));
            alert("Lid verwijderd!");
        }
    };

    // Scroll to last training
    const scrollToLastTraining = () => {
        if (trainingsContainerRef.current) {
            const trainingCards = trainingsContainerRef.current.querySelectorAll('.training-card');
            if (trainingCards.length > 0) {
                const lastCard = trainingCards[trainingCards.length - 1];
                lastCard.scrollIntoView({ 
                    behavior: 'smooth', 
                    block: 'center' 
                });
                
                // Add highlight effect
                lastCard.classList.add('newly-added');
                setTimeout(() => {
                    lastCard.classList.remove('newly-added');
                }, 2000);
            }
        }
    };

    return (
        <div>
            <main>
                <h1>Training Management</h1>
                
                {/* Training toevoegen sectie */}
                <section className="training-section">
                    <h2>{editingTrainingIndex !== null ? 'Training Bewerken' : 'Nieuwe Training Toevoegen'}</h2>
                    <form className="training-form" onSubmit={handleTrainingSubmit}>
                        <div className="form-group">
                            <label htmlFor="name">Training Naam:</label>
                            <input 
                                type="text" 
                                id="name"
                                name="name" 
                                value={trainingForm.name}
                                onChange={handleTrainingInputChange}
                                required 
                            />
                        </div>
                        
                        <div className="form-group">
                            <label htmlFor="date">Datum:</label>
                            <input 
                                type="date" 
                                id="date"
                                name="date" 
                                value={trainingForm.date}
                                onChange={handleTrainingInputChange}
                                required 
                            />
                        </div>
                        
                        <div className="form-group">
                            <label htmlFor="time">Tijd:</label>
                            <input 
                                type="time" 
                                id="time"
                                name="time" 
                                value={trainingForm.time}
                                onChange={handleTrainingInputChange}
                                required 
                            />
                        </div>
                        
                        <div className="form-group">
                            <label htmlFor="field">Veld:</label>
                            <select 
                                id="field"
                                name="field" 
                                value={trainingForm.field}
                                onChange={handleTrainingInputChange}
                                required
                            >
                                <option value="">Selecteer veld</option>
                                <option value="Veld 1">Veld 1</option>
                                <option value="Veld 2">Veld 2</option>
                                <option value="Veld 3">Veld 3</option>
                            </select>
                        </div>
                        
                        <div className="form-group">
                            <label htmlFor="max">Max Deelnemers:</label>
                            <input 
                                type="number" 
                                id="max"
                                name="max" 
                                value={trainingForm.max}
                                onChange={handleTrainingInputChange}
                                min="1" 
                                max="20" 
                                required 
                            />
                        </div>
                        
                        <div className="button-group">
                            <button type="submit" className="btn-primary">
                                {editingTrainingIndex !== null ? 'Training Bijwerken' : 'Training Toevoegen'}
                            </button>
                            {editingTrainingIndex !== null && (
                                <button 
                                    type="button" 
                                    className="btn-secondary"
                                    onClick={() => {
                                        setEditingTrainingIndex(null);
                                        setTrainingForm({
                                            name: '',
                                            date: '',
                                            time: '',
                                            field: '',
                                            max: 1
                                        });
                                    }}
                                >
                                    Annuleren
                                </button>
                            )}
                        </div>
                    </form>
                </section>

                {/* Trainingen overzicht */}
                <section className="training-section">
                    <h2>Geplande Trainingen ({trainings.length})</h2>
                    <div className="trainings-container" ref={trainingsContainerRef}>
                        {trainings.length === 0 ? (
                            <p className="empty-state">Nog geen trainingen gepland.</p>
                        ) : (
                            trainings.map((training, index) => (
                                <div key={index} className="training-card">
                                    <h3>{training.name}</h3>
                                    <p><strong>Datum:</strong> {training.date}</p>
                                    <p><strong>Tijd:</strong> {training.time}</p>
                                    <p><strong>Veld:</strong> {training.field}</p>
                                    <p><strong>Max deelnemers:</strong> {training.max}</p>
                                    <div className="button-group">
                                        <button 
                                            className="edit-btn" 
                                            onClick={() => bewerkTraining(index)}
                                        >
                                            Edit
                                        </button>
                                        <button 
                                            className="delete-btn" 
                                            onClick={() => verwijderTraining(index)}
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </section>

                {/* Leden beheer */}
                <section className="training-section">
                    <h2>Leden Beheer</h2>
                    <div className="members-container">
                        <h3>Nieuwe Lid Toevoegen</h3>
                        <form className="member-form" onSubmit={handleMemberSubmit}>
                            <div className="form-group">
                                <label htmlFor="firstName">Voornaam:</label>
                                <input 
                                    type="text" 
                                    id="firstName"
                                    name="firstName" 
                                    value={memberForm.firstName}
                                    onChange={handleMemberInputChange}
                                    required 
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="lastName">Achternaam:</label>
                                <input 
                                    type="text" 
                                    id="lastName"
                                    name="lastName" 
                                    value={memberForm.lastName}
                                    onChange={handleMemberInputChange}
                                    required 
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="email">Email:</label>
                                <input 
                                    type="email" 
                                    id="email"
                                    name="email" 
                                    value={memberForm.email}
                                    onChange={handleMemberInputChange}
                                    required 
                                />
                            </div>
                            
                            <button type="submit" className="btn-primary">Lid Toevoegen</button>
                        </form>
                        
                        <h3>Geregistreerde Leden ({members.length})</h3>
                        <div className="members-list">
                            <div className="members-grid">
                                {members.length === 0 ? (
                                    <p className="empty-state">Nog geen leden geregistreerd.</p>
                                ) : (
                                    members.map((member, index) => (
                                        <div key={index} className="member-card">
                                            <h3>{member.firstName} {member.lastName}</h3>
                                            <p><strong>Email:</strong> {member.email}</p>
                                            <button 
                                                className="delete-btn" 
                                                onClick={() => verwijderMember(index)}
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
};

export default Trainings;
