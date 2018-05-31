import React from 'react';
import { STATIC_URL } from 'common/constants/endpoints';

export const Footer = () => (
  <section id="footer">
    <div className="container">
      <div className="row">
        <div className="col-xs-12 col-sm-6 col-md-4">
          <div className="row row-space">
            <div className="col-md-12 footer-social">
              <a href="http://facebook.com/LinjeforeningenOnline" className="socialIcon-link">
                <img src={`${STATIC_URL}img/social/facebook.svg`} alt="Facebook" />
              </a>
              <a href="http://twitter.com/Online_NTNU" className="socialIcon-link">
                <img src={`${STATIC_URL}img/social/twitter.svg`} alt="Twitter" />
              </a>
              <a href="https://www.instagram.com/online_ntnu/" className="socialIcon-link">
                <img src={`${STATIC_URL}img/social/instagram.svg`} alt="Instagram" />
              </a>
              <a href="https://www.github.com/dotkom/" className="socialIcon-link">
                <img src={`${STATIC_URL}img/social/github.svg`} alt="Github" />
              </a>
              <a href="https://plus.google.com/107294836198591872251" className="socialIcon-link">
                <img src={`${STATIC_URL}img/social/gpluss.svg`} alt="Google Plus" />
              </a>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <p>Har du funnet en feil på nettsiden?<br />Ta kontakt med <a href="mailto:dotkom@online.ntnu.no">Utviklingsteamet</a></p>
            </div>
          </div>
        </div>
        <div className="col-xs-12 col-sm-6 col-md-4">
          <div className="row">
            <div className="col-md-12">
              <div className="contact-info">
                <div className="contact-item">
                  <span className="glyphicon glyphicon-briefcase"></span>992 548 045 (OrgNr)
                </div>
                <div className="contact-item">
                  <span className="glyphicon glyphicon-envelope"></span>kontakt@online.ntnu.no
                </div>
                <div className="contact-item">
                  <span className="glyphicon glyphicon-file"></span>okonomi@online.ntnu.no
                </div>
                <div className="contact-item">
                  <span className="glyphicon glyphicon-phone"></span>73 59 64 89
                </div>
              </div>
            </div>
          </div>
          <div className="row">
          <div className="col-xs-6 col-sm-6 col-md-6">
            <div className="address">
              <div className="address-heading">Besøksadresse <span className="glyphicon glyphicon-map-marker"></span></div>
              <div className="address-info">
                Rom 503<br />
                Høgskoleringen 3<br />
                NTNU Gløshaugen
              </div>
            </div>
          </div>
          <div className="col-xs-6 col-sm-6 col-md-6">
            <div className="address">
              <div className="address-heading">Post og Faktura <span className="glyphicon glyphicon-map-marker"></span></div>
              <div className="address-info">
                Online Linjeforening<br />
                Sem Sælandsv. 9<br />
                7491 Trondheim<br />
              </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-xs-12 col-md-4">
        <div id="footer-map"></div>
        </div>
      </div>
    </div>
  </section>
);

export default Footer;