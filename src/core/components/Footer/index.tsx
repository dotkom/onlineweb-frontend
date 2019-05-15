import React from 'react';
import style from './footer.less';
import SocialLinks from './SocialLinks';

const Footer = () => (
  <footer className={style.footer}>
    <SocialLinks />
    <p className={style.developers}>
      Har du funnet en feil på nettsiden?
      <br />
      Ta kontakt med <a href="mailto:dotkom@online.ntnu.no">Utviklingsteamet</a>
    </p>
  </footer>
);

export default Footer;
