import React from "react";
import { useNavigate } from "react-router-dom";

export const IndexTest: React.FC = () => {
  const navigate = useNavigate();
  const goToPageTennis = () => {  
    navigate("/tennisInfo");
  };
  const goToPagePadel = () => {
    navigate("/padelInfo");
  };


  return (
    <div>
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
            <img src="/images/geronimo.png" alt="Geronimo Logo" id="logo" />
          </div>
        </div>
      </div>

      {/* 2e sectie */}
      <div className="sport">
        <h1 onClick={() => navigate("/AboutUs")}>about us</h1>
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

      {/* 3e sectie */}
    {/* <div className="footer__container">
      <div className="footer__links">
        <div className="footer__link--wrapper">
          <div className="footer__link--items">
            <h2>About Us</h2>
            <a href="/">Contact opnemen</a>
            <a href="/">Volg ons</a>
            <a href="/">Terms of service</a>
          </div>
          <div className="footer__link--items">
            <h2>Volg ons</h2>
            <a href="/">Facebook</a>
            <a href="/">Insta</a>
            <a href="/">Linkedin</a>
          </div>
        </div>
      </div>

      <div className="social__media">
        <div className="social__media--wrap">
          <div className="footer__logo">
            <a href="/" id="footer__logo">
              <img src="/images/geronimo.png" alt="Geronimo Logo" className="footer__logo--img" />
            </a>
          </div>
          <p className="website__rights">Geronimo 2025. All rights reserved</p>
        </div>
      </div>
      </div> */}
    
    </div>
  );
};