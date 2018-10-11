import React from 'react';
import SocialLinks from './SocialLinks';
import style from './footer.less';
import ContactInfo from './ContactInfo';

export const Footer = () => (
  <section id="footer" className={style.footer}>
    <div className="container">
      <div className={style.container}>
        <div>
          <SocialLinks />
          <p className={style.contactDevelopers}>
            Har du funnet en feil på nettsiden?<br />
            Ta kontakt med <a href="mailto:dotkom@online.ntnu.no">Utviklingsteamet</a>
          </p>
        </div>
        <div>
          <ContactInfo />
          <div className={style.addressContainer}>
            <div className={style.address}>
              <div className={style.addressHeading}>
                Besøksadresse
                <span className="glyphicon glyphicon-map-marker" />
              </div>
              <div className={''}>
                Rom A4-137<br />
                Høgskoleringen 5<br />
                NTNU Gløshaugen
              </div>
            </div>
            <div className={style.address}>
              <div className={style.addressHeading}>
                Post og Faktura
                <span className="glyphicon glyphicon-map-marker" />
              </div>
              <div>
                Online Linjeforening<br />
                Sem Sælandsv. 9<br />
                7491 Trondheim<br />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default Footer;