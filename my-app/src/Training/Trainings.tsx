import React, { useState, useEffect, useRef } from "react";
import './Training.css';
import { Loginarray } from '../data/users';
import type { Training, Member } from './TrainingModels';
import TrainingForm from './TrainingForm/TrainingForm';
import TrainingList from './TrainingList/TrainingList';
import ParticipantManager from './ParticipantManager/ParticipantManager';
import MemberManager from './MemberManager/MemberManager';

const Trainings: React.FC = () => {
    // State voor trainingen en leden
    const [trainings, setTrainings] = useState<Training[]>([]);
    const [members, setMembers] = useState<Member[]>([]);
    
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
            const parsedMembers: Member[] = JSON.parse(savedMembers);
            // Merge saved members with login users, avoiding duplicates
            const allMembers = [...loginMembers];
            parsedMembers.forEach(savedMember => {
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

    // Add training handler
    const handleAddTraining = (training: Omit<Training, 'participants'>) => {
        const newTraining: Training = {
            ...training,
            participants: []
        };
        
        setTrainings(prev => [...prev, newTraining]);
        alert("Training succesvol toegevoegd!");
        
        // Scroll to newly added training
        setTimeout(() => {
            scrollToLastTraining();
        }, 100);
    };

    // Update training handler
    const handleUpdateTraining = (index: number, updatedTraining: Omit<Training, 'participants'>) => {
        const updatedTrainings = [...trainings];
        updatedTrainings[index] = {
            ...updatedTraining,
            participants: updatedTrainings[index].participants || []
        };
        setTrainings(updatedTrainings);
        setEditingTrainingIndex(null);
        alert("Training succesvol bijgewerkt!");
    };

    // Edit training function
    const handleEditTraining = (index: number) => {
        setEditingTrainingIndex(index);
    };

    // Delete training function
    const handleDeleteTraining = (index: number) => {
        if (window.confirm("Weet je zeker dat je deze training wilt verwijderen?")) {
            setTrainings(prev => prev.filter((_, i) => i !== index));
            alert("Training verwijderd!");
        }
    };

    // Manage participants
    const handleManageParticipants = (index: number) => {
        setManagingTrainingIndex(index);
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

    // Add member handler
    const handleAddMember = (member: Omit<Member, 'role'>) => {
        const newMember: Member = {
            ...member,
            role: 'member'  // Default role for manually added members
        };
        
        // Check if username already exists
        if (members.find(m => m.username === member.username)) {
            alert("Gebruikersnaam bestaat al!");
            return;
        }
        
        setMembers(prev => [...prev, newMember]);
        alert("Lid succesvol toegevoegd!");
    };

    // Delete member function
    const handleDeleteMember = (index: number) => {
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
                
                {/* Training Form Component */}
                <TrainingForm
                    onSubmit={editingTrainingIndex !== null ? 
                        (training) => handleUpdateTraining(editingTrainingIndex, training) :
                        handleAddTraining
                    }
                    onCancel={() => setEditingTrainingIndex(null)}
                    initialData={editingTrainingIndex !== null ? trainings[editingTrainingIndex] : undefined}
                    isEditing={editingTrainingIndex !== null}
                />

                {/* Training List Component */}
                <TrainingList
                    trainings={trainings}
                    trainingsContainerRef={trainingsContainerRef}
                    onEdit={handleEditTraining}
                    onDelete={handleDeleteTraining}
                    onManageParticipants={handleManageParticipants}
                />

                {/* Participant Management Modal */}
                {managingTrainingIndex !== null && (
                    <ParticipantManager
                        training={trainings[managingTrainingIndex]}
                        members={members}
                        onAddMember={(member) => addMemberToTraining(managingTrainingIndex, member)}
                        onRemoveMember={(username) => removeMemberFromTraining(managingTrainingIndex, username)}
                        onClose={() => setManagingTrainingIndex(null)}
                    />
                )}

                {/* Member Management Component */}
                <MemberManager
                    members={members}
                    onAddMember={handleAddMember}
                    onDeleteMember={handleDeleteMember}
                />
            </main>
        </div>
    );
};

export default Trainings;