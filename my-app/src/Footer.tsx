import React from 'react';

const Footer = () => {
  return (
    <div className="footer__container">
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
              {/* Note: You may need to adjust the image path depending on your project setup */}
              <img src="/images/geronimo.png" alt="Geronimo Logo" className="footer__logo--img" />
            </a>
          </div>
          <p className="website__rights">Geronimo 2025. All rights reserved</p>
        </div>
      </div>
    </div>
  );
};

export default Footer;