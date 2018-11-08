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

    <ContactInfo />

    <div className={style.addressContainer}>
      <div className={style.address}>
        <p className={style.addressHeading}>
          Besøksadresse
          <FontAwesomeIcon icon={faMapMarkerAlt} fixedWidth />
        </p>
        <p>Rom A4-137</p>
        <p>Høgskoleringen 5</p>
        <p>NTNU Gløshaugen</p>
      </div>

      <div className={style.address}>
        <p className={style.addressHeading}>
          Post og Faktura
          <FontAwesomeIcon icon={faMapMarkerAlt} fixedWidth />
        </p>
        <p>Online Linjeforening</p>
        <p>Sem Sælandsv. 9</p>
        <p>7491 Trondheim</p>
      </div>
    </div>
  </footer>
);

export default Footer;
