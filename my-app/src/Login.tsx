import React, { useState } from "react";
import './FrontendCSS/Login.css';
import { useNavigate } from "react-router-dom";
import { Loginarray } from './data/users';

interface LoginFormProps {
  setRole: React.Dispatch<React.SetStateAction<"" | "admin" | "member" | "teacher">>;
}

export const LoginForm: React.FC<LoginFormProps> = ({setRole}) => {
    const Navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const user = Loginarray.find(
        (u) => u.username === username && u.password === password
        );
        if (!user) {
            alert("Ongeldige gebruikersnaam of wachtwoord");
            return;
        }
        localStorage.setItem("role", user.role);
        localStorage.setItem("username", user.username);
        if (user.role === "admin") {
            setRole("admin");
            Navigate("/");
        }
        if (user.role === "member") {
            setRole("member");
            Navigate("/");
        }
        if (user.role === "teacher") {
            setRole("teacher");
            Navigate("/");
        }
        
    };

    return (
        <div className="login-page">
        <form className="login-container" onSubmit={handleSubmit}>
        <h2>Login</h2>
        <label htmlFor="username">Username</label>
        <input
            type="text"
            id="username"
            name="username"
            required
            value={username}
            onChange={e => setUsername(e.target.value)}
        />
        <label htmlFor="password">Password</label>
        <input
            type="password"
            id="password"
            name="password"
            required
            value={password}
            onChange={e => setPassword(e.target.value)}
        />
        <button type="submit" id="loginKnop">Login</button>
        </form>
        </div>
    );
};