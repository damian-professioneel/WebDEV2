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
            <img src="/images/pic1.svg" alt="pic" id="pic1.svg" />
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