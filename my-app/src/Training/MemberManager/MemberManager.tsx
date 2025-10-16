import React, { useState } from 'react';
import './MemberManager.css';
import type { Member } from '../TrainingModels';

interface MemberManagerProps {
    members: Member[];
    onAddMember: (member: Omit<Member, 'role'>) => void;
    onDeleteMember: (index: number) => void;
}

const MemberManager: React.FC<MemberManagerProps> = ({ 
    members, 
    onAddMember, 
    onDeleteMember 
}) => {
    const [memberForm, setMemberForm] = useState({
        username: '',
        firstName: '',
        lastName: '',
        email: ''
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setMemberForm(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onAddMember(memberForm);
        
        // Reset form
        setMemberForm({
            username: '',
            firstName: '',
            lastName: '',
            email: ''
        });
    };

    return (
        <section className="training-section">
            <h2>Leden Beheer</h2>
            <div className="members-container">
                <h3>Nieuwe Lid Toevoegen</h3>
                <form className="member-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="username">Gebruikersnaam:</label>
                        <input 
                            type="text" 
                            id="username"
                            name="username" 
                            value={memberForm.username}
                            onChange={handleInputChange}
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
                            onChange={handleInputChange}
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
                            onChange={handleInputChange}
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
                            onChange={handleInputChange}
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
                                        onClick={() => onDeleteMember(index)}
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
    );
};

export default MemberManager;