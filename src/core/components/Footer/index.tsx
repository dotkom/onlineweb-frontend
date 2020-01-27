import Img from 'common/components/Img';
import React from 'react';
import style from './footer.less';
import SocialLinks from './SocialLinks';

const Footer = () => (
  <footer className={style.footer}>
    <a href="http://www.bekk.no/" className={style.sponsor}>
      <Img src="/static/img/hsp-832576.svg" alt="Hovedsamarbeidspartner - Bekk" />
    </a>
    <p>
      Har du funnet en feil på nettsiden?
      <br />
      Ta kontakt med <a href="mailto:dotkom@online.ntnu.no">Utviklingsteamet</a>
    </p>
    <SocialLinks />
  </footer>
);

export default Footer;
