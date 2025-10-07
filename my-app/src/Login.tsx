import React, { useState } from "react";
import './FrontendCSS/Login.css';
import { useNavigate } from "react-router-dom";

const Loginarray = [
  { username: "user1", password: "pass1" },
  { username: "user2", password: "pass2" }
];

export const LoginForm: React.FC = () => {
    const Navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    if (!Loginarray.some(user => user.username === username && user.password === password)) {
        alert("Ongeldige gebruikersnaam of wachtwoord");
        return;
    }
    e.preventDefault();
    Navigate("/");
  };

  return (
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
  );
};