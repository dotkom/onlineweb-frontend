import { faBriefcase, faEnvelope, faFile, faMobileAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

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
        <FontAwesomeIcon icon={faBriefcase} fixedWidth /> 992 548 045 (OrgNr)
      </p>
      <a href="mailto:kontakt@online.ntnu.no">
        <p>
          <FontAwesomeIcon icon={faEnvelope} fixedWidth /> kontakt@online.ntnu.no
        </p>
      </a>
      <a href="mailto:okonomi@online.ntnu.no">
        <p>
          <FontAwesomeIcon icon={faFile} fixedWidth /> okonomi@online.ntnu.no <br />
        </p>
      </a>
      <a href="tel:+4741164609">
        <p>
          <FontAwesomeIcon icon={faMobileAlt} fixedWidth /> 454 61 372
        </p>
      </a>
    </div>
    <div>
      <p>Post og faktura: </p>
      <p>Online Linjeforening </p>
      <p>Sem Sælands vei 9 </p>
      <p>7491 Trondheim</p>
    </div>
  </>
);

export default ContactInfo;
