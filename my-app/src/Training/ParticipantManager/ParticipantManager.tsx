import React from 'react';
import './ParticipantManager.css';
import type { Training, Member } from '../TrainingModels';

interface ParticipantManagerProps {
    training: Training;
    members: Member[];
    onAddMember: (member: Member) => void;
    onRemoveMember: (username: string) => void;
    onClose: () => void;
}

const ParticipantManager: React.FC<ParticipantManagerProps> = ({
    training,
    members,
    onAddMember,
    onRemoveMember,
    onClose
}) => {
    return (
        <section className="training-section">
            <h2>Deelnemers Beheren - {training.name}</h2>
            <div className="participants-management">
                <div className="current-participants">
                    <h3>Huidige Deelnemers ({training.participants.length}/{training.max})</h3>
                    {training.participants.length === 0 ? (
                        <p>Geen deelnemers aangemeld.</p>
                    ) : (
                        <div className="participants-list">
                            {training.participants.map((username, idx) => {
                                const member = members.find(m => m.username === username);
                                return member ? (
                                    <div key={idx} className="participant-card">
                                        <span>{member.firstName} {member.lastName} ({member.role})</span>
                                        <button 
                                            className="remove-btn"
                                            onClick={() => onRemoveMember(username)}
                                        >
                                            Verwijderen
                                        </button>
                                    </div>
                                ) : (
                                    <div key={idx} className="participant-card">
                                        <span>{username} (Onbekend)</span>
                                        <button 
                                            className="remove-btn"
                                            onClick={() => onRemoveMember(username)}
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
                            .filter(member => !training.participants.includes(member.username))
                            .map((member, idx) => (
                            <div key={idx} className="member-card">
                                <h4>{member.firstName} {member.lastName}</h4>
                                <p><strong>Email:</strong> {member.email}</p>
                                <p><strong>Role:</strong> {member.role}</p>
                                <button 
                                    className="add-btn"
                                    onClick={() => onAddMember(member)}
                                    disabled={training.participants.length >= training.max}
                                >
                                    {training.participants.length >= training.max ? 'Training Vol' : 'Toevoegen'}
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
                
                <div className="management-actions">
                    <button 
                        className="btn-secondary"
                        onClick={onClose}
                    >
                        Sluiten
                    </button>
                </div>
            </div>
        </section>
    );
};

export default ParticipantManager;