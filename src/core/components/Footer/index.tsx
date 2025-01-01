import React from 'react';

import ContactInfo from './ContactInfo';
import style from './footer.less';
import SocialLinks from './SocialLinks';
import { HSP } from 'common/constants/hsp';

const Footer = () => (
  <footer className={style.footer}>
    <div className={style.footerContent}>
      {HSP ? (
        <div className={style.mainSponsor}>
          <a href={HSP.website} className={style.sponsor}>
            <img src={HSP.logo} alt={HSP.description} />
          </a>
          <span className={style.hsp}>Hovedsamarbeidspartner</span>
        </div>
      ) : (
        <div />
      )}
      <p>
        Har du funnet en feil på nettsiden?
        <br />
        Ta kontakt med <a href="mailto:dotkom@online.ntnu.no">Utviklingsteamet</a>
      </p>
      <SocialLinks />
      <ContactInfo />
      <p className={style.mailinglists}>
        <a href="https://wiki.online.ntnu.no/linjeforening/e-postlister/">E-postlister for linjeforeninger</a>
      </p>
      <p className={style.infoSites}>
        <a href="https://gloshaugen.info">gloshaugen.info</a>
        <a href="https://dragvoll.info">dragvoll.info</a>
        <a href="https://karrieredager.info">karrieredager.info</a>
      </p>
    </div>
  </footer>
);

export default Footer;
