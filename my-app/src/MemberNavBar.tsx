import { useNavigate } from "react-router-dom";
import React from "react";


const AdminNavBar : React.FC = () =>{
    const navigate = useNavigate();

    return(
        <div>
        {/* Navigatie bar */}
      <nav className="navbar">
        <div className="navbar__container">
          <a href="/" id="navbar__logo">Geronimo!</a>
          <div className="navbar__toggle" id="mobile-menu">
            <span className="bar"></span>
            <span className="bar"></span>
            <span className="bar"></span>
          </div>
          <ul className="navbar__menu">
            <li className="navbar__item">
              <button onClick={() => navigate("/")} className="navbar__links">Home</button>
            </li>
            <li className="navbar__item">
              <button onClick={() => navigate("/trainings")} className="navbar__links">Trainings</button>
            </li>
            <li className="navbar__item">
              <button onClick={() => navigate("/admin")} className="navbar__links">Your Lessons</button>
            </li>
            <li className="navbar__item">
              <button onClick={() => navigate("/teachers")} className="navbar__links">Teachers</button>
            </li>
            <li className="navbar__item">
              <button onClick={() => navigate("/fields")} className="navbar__links">Fields</button>
            </li>
            <li className="navbar__item">
              <button onClick={() => navigate("/lessons")} className="navbar__links">Lessons</button>
            </li>
            <li className="navbar__btn">
              <button className="button" id="signUp" onClick={() => navigate("/login")}>Sign In</button>
            </li>
          </ul>
        </div>
      </nav>
        </div>

    )
}

export default AdminNavBar;