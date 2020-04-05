import { faBriefcase, faEnvelope, faFile, faMobileAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import style from './footer.less';

const ContactInfo = () => (
  <>
    <address>
      <p>Besøksadresse: </p>
      <p>A-blokka, A4-137</p>
      <p>Høgskoleringen 5 </p>
      <p>NTNU Gløshaugen</p>
    </address>
    <div>
      <p>Kontaktinformasjon:</p>
      <p>
        <FontAwesomeIcon icon={faBriefcase} fixedWidth className={style.icon} /> 992 548 045 (OrgNr)
      </p>
      <a href="mailto:kontakt@online.ntu.no">
        <p>
          <FontAwesomeIcon icon={faEnvelope} fixedWidth className={style.icon} /> kontakt@online.ntu.no
        </p>
      </a>
      <a href="mailto:okonomi@online.ntnu.no">
        <p>
          <FontAwesomeIcon icon={faFile} fixedWidth className={style.icon} /> okonomi@online.ntnu.no <br />
        </p>
      </a>
      <a href="tel:+4773596489">
        <p>
          <FontAwesomeIcon icon={faMobileAlt} fixedWidth className={style.icon} /> 73 59 64 89
        </p>
      </a>
    </div>
    <div>
      <p>Post og faktura: </p>
      <p>Online Linjeforening </p>
      <p>Sem Sælandsv. 9 </p>
      <p>7491 Trondheim</p>
    </div>
  </>
);

export default ContactInfo;
