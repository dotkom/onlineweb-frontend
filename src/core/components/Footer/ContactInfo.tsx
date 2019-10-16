import { faBriefcase, faEnvelope, faFile, faMobileAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import style from './footer.less';

const ContactInfo = () => (
  <div className={style.contact}>
    <div>
      <FontAwesomeIcon icon={faBriefcase} fixedWidth className={style.icon} /> 992 548 045 (OrgNr) <br />
      <a href="mailto:kontakt@online.ntu.no">
        <FontAwesomeIcon icon={faEnvelope} fixedWidth className={style.icon} /> kontakt@online.ntu.no <br />
      </a>
      <a href="mailto:okonomi@online.ntnu.no">
        <FontAwesomeIcon icon={faFile} fixedWidth className={style.icon} /> okonomi@online.ntnu.no <br />
      </a>
      <a href="tel:+4773596489">
        <FontAwesomeIcon icon={faMobileAlt} fixedWidth className={style.icon} /> 73 59 64 89
      </a>
    </div>
    <div>
      Besøksadresse: <br />
      A-blokka, A4-137 <br />
      Høgskoleringen 5 <br />
      NTNU Gløshaugen
    </div>
    <div>
      Post og faktura: <br />
      Online Linjeforening <br />
      Sem Sælandsv. 9 <br />
      7491 Trondheim
    </div>
  </div>
);

export default ContactInfo;
