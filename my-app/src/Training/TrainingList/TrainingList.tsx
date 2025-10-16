import React from 'react';
import './TrainingList.css';
import type { Training } from '../TrainingModels';

interface TrainingListProps {
    trainings: Training[];
    trainingsContainerRef: React.RefObject<HTMLDivElement | null>;
    onEdit: (index: number) => void;
    onDelete: (index: number) => void;
    onManageParticipants: (index: number) => void;
}

const TrainingList: React.FC<TrainingListProps> = ({
    trainings,
    trainingsContainerRef,
    onEdit,
    onDelete,
    onManageParticipants
}) => {
    return (
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
                                    onClick={() => onEdit(index)}
                                >
                                    Edit
                                </button>
                                <button 
                                    className="delete-btn" 
                                    onClick={() => onDelete(index)}
                                >
                                    Delete
                                </button>
                                <button 
                                    className="manage-btn"
                                    onClick={() => onManageParticipants(index)}
                                >
                                    Manage Participants ({training.participants.length}/{training.max})
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </section>
    );
};

export default TrainingList;