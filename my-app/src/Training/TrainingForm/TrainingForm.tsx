import React, { useState, useEffect } from 'react';
import './TrainingForm.css';
import type { Training } from '../TrainingModels';

interface TrainingFormProps {
    onSubmit: (training: Omit<Training, 'participants'>) => void;
    onCancel?: () => void;
    initialData?: Training;
    isEditing?: boolean;
}

const TrainingForm: React.FC<TrainingFormProps> = ({
    onSubmit,
    onCancel,
    initialData,
    isEditing = false
}) => {
    const [trainingForm, setTrainingForm] = useState({
        name: '',
        date: '',
        time: '',
        field: '',
        max: '1'
    });

    // Update form when initialData changes
    useEffect(() => {
        if (initialData && isEditing) {
            setTrainingForm({
                name: initialData.name,
                date: initialData.date,
                time: initialData.time,
                field: initialData.field,
                max: initialData.max.toString()
            });
        } else if (!isEditing) {
            setTrainingForm({
                name: '',
                date: '',
                time: '',
                field: '',
                max: '1'
            });
        }
    }, [initialData, isEditing]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setTrainingForm(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        const training: Omit<Training, 'participants'> = {
            name: trainingForm.name,
            date: trainingForm.date,
            time: trainingForm.time,
            field: trainingForm.field,
            max: parseInt(trainingForm.max) || 1
        };
        
        onSubmit(training);
        
        // Reset form if not editing
        if (!isEditing) {
            setTrainingForm({
                name: '',
                date: '',
                time: '',
                field: '',
                max: '1'
            });
        }
    };

    return (
        <section className="training-section">
            <h2>{isEditing ? 'Training Bewerken' : 'Nieuwe Training Toevoegen'}</h2>
            <form className="training-form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Training Naam:</label>
                    <input 
                        type="text" 
                        id="name"
                        name="name" 
                        value={trainingForm.name}
                        onChange={handleInputChange}
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
                        onChange={handleInputChange}
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
                        onChange={handleInputChange}
                        required 
                    />
                </div>
                
                <div className="form-group">
                    <label htmlFor="field">Veld:</label>
                    <select 
                        id="field"
                        name="field" 
                        value={trainingForm.field}
                        onChange={handleInputChange}
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
                        onChange={handleInputChange}
                        min="1" 
                        max="20" 
                        required 
                    />
                </div>
                
                <div className="button-group">
                    <button type="submit" className="btn-primary">
                        {isEditing ? 'Training Bijwerken' : 'Training Toevoegen'}
                    </button>
                    {isEditing && onCancel && (
                        <button 
                            type="button" 
                            className="btn-secondary"
                            onClick={onCancel}
                        >
                            Annuleren
                        </button>
                    )}
                </div>
            </form>
        </section>
    );
};

export default TrainingForm;