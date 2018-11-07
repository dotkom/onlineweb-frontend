import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons/faMapMarkerAlt';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import ContactInfo from './ContactInfo';
import style from './footer.less';
import SocialLinks from './SocialLinks';

export const Footer = () => (
  <footer className={style.footer}>
    <div>
      <SocialLinks />

      <p className={style.contactDevelopers}>
        Har du funnet en feil på nettsiden?
        <br />
        Ta kontakt med <a href="mailto:dotkom@online.ntnu.no">Utviklingsteamet</a>
      </p>
    </div>

    <div>
      <ContactInfo />

      <div className={style.addressContainer}>
        <div className={style.address}>
          <div className={style.addressHeading}>
            Besøksadresse
            <FontAwesomeIcon icon={faMapMarkerAlt} fixedWidth />
          </div>

          <div>
            Rom A4-137
            <br />
            Høgskoleringen 5<br />
            NTNU Gløshaugen
          </div>
        </div>

        <div className={style.address}>
          <div className={style.addressHeading}>
            Post og Faktura
            <FontAwesomeIcon icon={faMapMarkerAlt} fixedWidth />
          </div>

          <div>
            Online Linjeforening
            <br />
            Sem Sælandsv. 9<br />
            7491 Trondheim
          </div>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
