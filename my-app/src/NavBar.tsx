import { resolvePath, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
interface NavbarProps {
  role: "admin" | "member" | "teacher" | "";
  setRole: React.Dispatch<React.SetStateAction<"admin" | "member" | "teacher" | "">>;
}

const Navbar : React.FC<NavbarProps> = ({ role, setRole }: NavbarProps) =>{
    const navigate = useNavigate();
    const [username, setUsername] = useState<string | null>(null);
    const [dropdownOpen, setDropdownOpen] = useState(false);

    useEffect(() => {
      const storedUsername = localStorage.getItem("username");
      setUsername(storedUsername);
    }, [role]);

    const handleLogout = () => {
      localStorage.removeItem("role");
      localStorage.removeItem("username");
      setRole("");
      setDropdownOpen(false);
      navigate("/login");
    }

    const links = [
        {label: "Home", path: "/"},
        ...(role === "admin" ? [{ label: "Admin Dashboard", path: "/admin" }] : []),
        ...(role === "teacher" ? [{ label: "Teacher Page", path: "/teacher" }] : []),
        ...(role === "member" ? [{ label: "Member Page", path: "/member" }] : []),
        { label: "Lessons", path: "/lessons" },
        { label: "Teachers", path: "/teachers" },
        { label: "Fields", path: "/fields" }
    ]


    return (
        <nav className="navbar">
            <div className="navbar__container">
            <a href="/" id="navbar__logo">Logo</a>

            <ul className="navbar__menu">
                {/* Dynamische links */}
                {links.map((link) => (
                <li className="navbar__item" key={link.label}>
                    <button onClick={() => navigate(link.path)} className="navbar__links">
                    {link.label}
                    </button>
                </li>
                ))}

                {/* Rechts: Sign In of Dropdown */}
                <li className="navbar__item navbar__right">
                {role ? (
                    <div className={`dropdown ${dropdownOpen ? "open" : ""}`}>
                    <button
                        className="navbar__links"
                        onClick={() => setDropdownOpen(!dropdownOpen)}
                    >
                        {username} ⌄
                    </button>
                    {dropdownOpen && (
                        <div className="dropdown__menu">
                        <p><strong>Rol:</strong> {role}</p>
                        <p><strong>Gebruiker:</strong> {username}</p>
                        <button onClick={handleLogout}>Log out</button>
                        </div>

                    )
                    }
                    </div>
                ) : (
                    <button
                    className="button"
                    id="signUp"
                    onClick={() => navigate("/login")}
                    >
                    Sign In
                    </button>
                )}
                </li>
            </ul>
            </div>
        </nav>
    );
}

export default Navbar;