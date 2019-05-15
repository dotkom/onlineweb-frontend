import Img from 'common/components/Img';
import React from 'react';
import style from './footer.less';
import SocialLinks from './SocialLinks';

const Footer = () => (
  <footer className={style.footer}>
    <a href="http://www.knowit.no/" className={style.sponsor}>
      <Img src="/static/img/knowit.svg" alt="Hovedsamarbeidspartner - Knowit" />
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
