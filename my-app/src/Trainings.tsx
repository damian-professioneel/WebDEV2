import React, { useState, useEffect, useRef } from "react";
import './FrontendCSS/styles.css';
import { Loginarray } from './data/users';

// TypeScript interfaces
interface Training {
    name: string;
    date: string;
    time: string;
    field: string;
    max: number;
    participants: string[]; // Array of usernames who signed up
}

// Member interface for displaying users (excludes password for security)
interface Member {
    username: string;
    firstName: string;
    lastName: string;
    email: string;
    role: string;
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
        max: '1'  // Keep as string to allow empty state during editing
    });
    
    // State voor member formulier - now for additional members
    const [memberForm, setMemberForm] = useState({
        username: '',
        firstName: '',
        lastName: '',
        email: ''
    });

    // State voor edit mode
    const [editingTrainingIndex, setEditingTrainingIndex] = useState<number | null>(null);
    
    // State voor participant management
    const [managingTrainingIndex, setManagingTrainingIndex] = useState<number | null>(null);
    
    // Ref voor scrolling naar nieuwe training
    const trainingsContainerRef = useRef<HTMLDivElement>(null);

    // Load data from sessionStorage on component mount and initialize with login users
    useEffect(() => {
        const savedTrainings = sessionStorage.getItem('trainings');
        const savedMembers = sessionStorage.getItem('members');
        
        // Convert login users to member format (excluding password)
        const loginMembers: Member[] = Loginarray.map(user => ({
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            role: user.role
        }));
        
        if (savedTrainings) {
            setTrainings(JSON.parse(savedTrainings));
        }
        if (savedMembers) {
            const parsedMembers = JSON.parse(savedMembers);
            // Merge login users with saved members (avoid duplicates)
            const allMembers = [...loginMembers];
            parsedMembers.forEach((savedMember: Member) => {
                if (!allMembers.find(m => m.username === savedMember.username)) {
                    allMembers.push(savedMember);
                }
            });
            setMembers(allMembers);
        } else {
            // If no saved members, start with login users
            setMembers(loginMembers);
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
            [name]: name === 'max' ? value : value
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
                max: parseInt(trainingForm.max) || 1,
                participants: updatedTrainings[editingTrainingIndex].participants || []
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
                max: parseInt(trainingForm.max) || 1,
                participants: []
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
            max: '20'
        });
    };

    // Submit member form
    const handleMemberSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        const newMember: Member = {
            username: memberForm.username,
            firstName: memberForm.firstName,
            lastName: memberForm.lastName,
            email: memberForm.email,
            role: 'member'  // Default role for manually added members
        };
        
        // Check if username already exists
        if (members.find(m => m.username === memberForm.username)) {
            alert("Gebruikersnaam bestaat al!");
            return;
        }
        
        setMembers(prev => [...prev, newMember]);
        alert("Lid succesvol toegevoegd!");
        
        // Reset form
        setMemberForm({
            username: '',
            firstName: '',
            lastName: '',
            email: ''
        });
    };

    // Add member to training
    const addMemberToTraining = (trainingIndex: number, member: Member) => {
        const updatedTrainings = [...trainings];
        const training = updatedTrainings[trainingIndex];
        
        // Check if member is already in training
        if (training.participants.includes(member.username)) {
            alert(`${member.firstName} ${member.lastName} is al aangemeld voor ${training.name}`);
            return;
        }
        
        // Check if training is full
        if (training.participants.length >= training.max) {
            alert(`Training ${training.name} is vol!`);
            return;
        }
        
        training.participants.push(member.username);
        setTrainings(updatedTrainings);
        alert(`${member.firstName} ${member.lastName} toegevoegd aan ${training.name}`);
    };
    
    // Remove member from training
    const removeMemberFromTraining = (trainingIndex: number, username: string) => {
        const updatedTrainings = [...trainings];
        const training = updatedTrainings[trainingIndex];
        
        training.participants = training.participants.filter(participant => participant !== username);
        setTrainings(updatedTrainings);
        
        const member = members.find(m => m.username === username);
        alert(`${member ? member.firstName + ' ' + member.lastName : username} verwijderd uit ${training.name}`);
    };
    // Edit training function
    const bewerkTraining = (index: number) => {
        const training = trainings[index];
        setTrainingForm({
            name: training.name,
            date: training.date,
            time: training.time,
            field: training.field,
            max: training.max.toString()
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
                                            max: '1'
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
                                        <button 
                                            className ="manage-btn"
                                            onClick={() => setManagingTrainingIndex(index)}
                                        >
                                            Manage Participants ({training.participants.length}/{training.max})
                                        </button>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </section>

                {/* Participant Management Modal */}
                {managingTrainingIndex !== null && (
                    <section className="training-section">
                        <h2>Deelnemers Beheren - {trainings[managingTrainingIndex].name}</h2>
                        <div className="participants-management">
                            <div className="current-participants">
                                <h3>Huidige Deelnemers ({trainings[managingTrainingIndex].participants.length}/{trainings[managingTrainingIndex].max})</h3>
                                {trainings[managingTrainingIndex].participants.length === 0 ? (
                                    <p>Geen deelnemers aangemeld.</p>
                                ) : (
                                    <div className="participants-list">
                                        {trainings[managingTrainingIndex].participants.map((username, idx) => {
                                            const member = members.find(m => m.username === username);
                                            return member ? (
                                                <div key={idx} className="participant-card">
                                                    <span>{member.firstName} {member.lastName} ({member.role})</span>
                                                    <button 
                                                        className="remove-btn"
                                                        onClick={() => removeMemberFromTraining(managingTrainingIndex, username)}
                                                    >
                                                        Verwijderen
                                                    </button>
                                                </div>
                                            ) : (
                                                <div key={idx} className="participant-card">
                                                    <span>{username} (Onbekend)</span>
                                                    <button 
                                                        className="remove-btn"
                                                        onClick={() => removeMemberFromTraining(managingTrainingIndex, username)}
                                                    >
                                                        Verwijderen
                                                    </button>
                                                </div>
                                            );
                                        })}
                                    </div>
                                )}
                            </div>
                            
                            <div className="available-members">
                                <h3>Beschikbare Leden</h3>
                                <div className="members-grid">
                                    {members
                                        .filter(member => !trainings[managingTrainingIndex].participants.includes(member.username))
                                        .map((member, idx) => (
                                        <div key={idx} className="member-card">
                                            <h4>{member.firstName} {member.lastName}</h4>
                                            <p><strong>Email:</strong> {member.email}</p>
                                            <p><strong>Role:</strong> {member.role}</p>
                                            <button 
                                                className="add-btn"
                                                onClick={() => addMemberToTraining(managingTrainingIndex, member)}
                                                disabled={trainings[managingTrainingIndex].participants.length >= trainings[managingTrainingIndex].max}
                                            >
                                                {trainings[managingTrainingIndex].participants.length >= trainings[managingTrainingIndex].max ? 'Training Vol' : 'Toevoegen'}
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            
                            <div className="management-actions">
                                <button 
                                    className="btn-secondary"
                                    onClick={() => setManagingTrainingIndex(null)}
                                >
                                    Sluiten
                                </button>
                            </div>
                        </div>
                    </section>
                )}

                {/* Leden beheer */}
                <section className="training-section">
                    <h2>Leden Beheer</h2>
                    <div className="members-container">
                        <h3>Nieuwe Lid Toevoegen</h3>
                        <form className="member-form" onSubmit={handleMemberSubmit}>
                            <div className="form-group">
                                <label htmlFor="username">Gebruikersnaam:</label>
                                <input 
                                    type="text" 
                                    id="username"
                                    name="username" 
                                    value={memberForm.username}
                                    onChange={handleMemberInputChange}
                                    required 
                                />
                            </div>

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
                                            <p><strong>Username:</strong> {member.username}</p>
                                            <p><strong>Email:</strong> {member.email}</p>
                                            <p><strong>Role:</strong> {member.role}</p>
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
