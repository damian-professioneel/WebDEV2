// Shared user data that can be imported by any component
export interface User {
    username: string;
    password: string;
    role: "member" | "admin" | "teacher";
    email: string;
    firstName: string;
    lastName: string;
    trainings?: any[];
}

export const Loginarray: User[] = [
    { username: "user1", password: "pass1", role: "member", email: "user1@example.com", firstName: "Mees", lastName: "Breedveld", trainings: [] },
    { username: "admin2", password: "pass2", role: "admin", email: "admin2@example.com", firstName: "Admin", lastName: "Two" },
    { username: "teacher3", password: "pass3", role: "teacher", email: "teacher3@example.com", firstName: "Teacher", lastName: "Three" }
];

// Helper functions to work with users
export const getUserByUsername = (username: string): User | undefined => {
    return Loginarray.find(user => user.username === username);
};

export const getUsersByRole = (role: "member" | "admin" | "teacher"): User[] => {
    return Loginarray.filter(user => user.role === role);
};

export const getAllMembers = (): User[] => {
    return Loginarray.filter(user => user.role === "member");
};

// Helper function to get display name
export const getDisplayName = (user: User): string => {
    return `${user.firstName} ${user.lastName}`;
};

// Helper function to add a new user (for future functionality)
export const addUser = (user: User): void => {
    Loginarray.push(user);
};