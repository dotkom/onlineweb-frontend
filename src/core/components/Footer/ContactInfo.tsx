import React from 'react';
import style from './footer.less';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBriefcase, faEnvelope, faMobileAlt, faFile } from '@fortawesome/free-solid-svg-icons';


const ContactInfo = () => (
    <div className={style.contact}>
        <div>
            <FontAwesomeIcon icon={faBriefcase} fixedWidth className={style.icon}/> 992 548 045 (OrgNr) <br />
            <FontAwesomeIcon icon={faEnvelope} fixedWidth className={style.icon}/> kontakt@online.ntu.no <br />
            <FontAwesomeIcon icon={faFile} fixedWidth className={style.icon}/> okonomi@online.ntnu.no <br />
            <FontAwesomeIcon icon={faMobileAlt} fixedWidth className={style.icon}/> 73 59 64 89 
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