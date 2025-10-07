import React from "react";
import "./FrontendCSS/stylestest.css"; 
import { useNavigate } from "react-router-dom";

export const IndexTest: React.FC = () => {
    const navigate = useNavigate();
  // Dummy handlers voor de sport cards
  const goToPageTennis = () => {
    alert("Ga naar Tennis pagina");
    // window.location.href = "/tennis"; // of een andere route
  };
  const goToPagePadel = () => {
    alert("Ga naar Padel pagina");
    // window.location.href = "/padel";
  };
  const goToLogin = () => {
    navigate("/login");
  }
  const goToLessons = () => {
    navigate("/lessons");
  }

  return (
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
              <a href="indextest.html" className="navbar__links">Home</a>
            </li>
            <li className="navbar__item">
              <a href="trainings.html" className="navbar__links">Trainings</a>
            </li>
            <li className="navbar__item">
              <a href="teachers.html" className="navbar__links">Teachers</a>
            </li>
            <li className="navbar__item">
              <a href="fields.html" className="navbar__links">Fields</a>
            </li>
            <li className="navbar__item">
              <a onClick={goToLessons} className="navbar__links">Lessons</a>
            </li>
            <li className="navbar__btn">
              <a className="button" id="signUp" onClick={goToLogin}>Sign In</a>
            </li>
          </ul>
        </div>
      </nav>

      {/* main tekst */}
      <div className="main">
        <div className="main__container">
          <div className="main__content">
            <h1>TENNISVERENIGING GERONIMO</h1>
            <h2>Over onze trainingen.</h2>
            <p>Test123</p>
            <button className="main__btn">
              <a href="/">Get Started</a>
            </button>
          </div>
          <div className="main__img--container">
            <img src="images/pic1.svg" alt="pic" id="main__img" />
          </div>
        </div>
      </div>

      {/* 2e sectie */}
      <div className="sport">
        <h1>about us</h1>
        <div className="sport__container">
          <div className="sport__card" onClick={goToPageTennis}>
            <h2>Tennis</h2>
            <p>Klik voor meer informatie</p>
          </div>
          <div className="sport__card" onClick={goToPagePadel}>
            <h2>Padel</h2>
            <p>Klik voor meer informatie</p>
          </div>
        </div>
      </div>
    </div>
  );
};