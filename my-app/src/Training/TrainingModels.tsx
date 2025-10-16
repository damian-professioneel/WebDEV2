export interface Training {
    name: string;
    date: string;
    time: string;
    field: string;
    max: number;
    participants: string[]; // Array of usernames who signed up
}

// Member interface for displaying users 
export interface Member {
    username: string;
    firstName: string;
    lastName: string;
    email: string;
    role: string;
}