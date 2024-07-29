import React from 'react';

import ContactInfo from './ContactInfo';
import style from './footer.less';
import SocialLinks from './SocialLinks';

const HSP = {
  website: 'https://www.bekk.no/',
  logo: '/img/bekk.svg',
  description: 'Hovedsamarbeidspartner - Bekk',
};

const Footer = () => (
  <footer className={style.footer}>
    <div className={style.footerContent}>
      <div className={style.mainSponsor}>
        <a href={HSP.website} className={style.sponsor}>
          <img src={HSP.logo} alt={HSP.description} />
        </a>
        <span className={style.hsp}>Hovedsamarbeidspartner</span>
      </div>
      <p>
        Har du funnet en feil på nettsiden?
        <br />
        Ta kontakt med <a href="mailto:dotkom@online.ntnu.no">Utviklingsteamet</a>
      </p>
      <SocialLinks />
      <ContactInfo />
      <p className={style.mailinglists}>
        <a href="https://online.ntnu.no/resourcecenter/mailinglists/">E-postlister for linjeforeninger</a>
      </p>
    </div>
  </footer>
);

export default Footer;
