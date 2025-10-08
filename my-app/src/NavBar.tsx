import { useNavigate } from "react-router-dom";
import React from "react";


const Navbar : React.FC = () =>{
    const navigate = useNavigate();
    
    // Debug log to check if component is rendering
    console.log("NavBar is rendering!");

  const goToLogin = () => {
    navigate("/login");
  }
  const goToLessons = () => {
    navigate("/lessons");
  }
  const goToHome = () => {
    navigate("/");
  }

  const goToTrainings = () => {
    navigate("/");
  }

  const goToTeachers = () => {
    navigate("/teachers");
  }

  const goToFields = () => {
    navigate("/");
  }

    return(
        <div>
        {/* Navigatie bar */}
      <nav className="navbar">
        <div className="navbar__container">
          <a href="" id="navbar__logo">Logo</a>
          <div className="navbar__toggle" id="mobile-menu">
            <span className="bar"></span>
            <span className="bar"></span>
            <span className="bar"></span>
          </div>
          <ul className="navbar__menu">
            <li className="navbar__item">
              <button onClick={goToHome} className="navbar__links">Home</button>
            </li>
            <li className="navbar__item">
              <button onClick={goToTrainings} className="navbar__links">Trainings</button>
            </li>
            <li className="navbar__item">
              <button onClick={goToTeachers} className="navbar__links">Teachers</button>
            </li>
            <li className="navbar__item">
              <button onClick={goToFields} className="navbar__links">Fields</button>
            </li>
            <li className="navbar__item">
              <button onClick={goToLessons} className="navbar__links">Lessons</button>
            </li>
            <li className="navbar__btn">
              <button className="button" id="signUp" onClick={goToLogin}>Sign In</button>
            </li>
          </ul>
        </div>
      </nav>
        </div>

    )
}

export default Navbar;