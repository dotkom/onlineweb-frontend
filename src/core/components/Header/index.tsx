import { routes } from 'App';
import Authenticate from 'authentication/components/Authenticate';
import React from 'react';
import { Link } from 'react-router-dom';
import style from './header.less';
import HeaderLogo from './HeaderLogo';
import HeaderLogin from './Login';
import MainSponsor from './MainSponsor';

export const Header = () => (
  <header className={style.header}>
    <div className={style.grid}>
      <HeaderLogo />
      <div className={style.links}>
        <Link to={routes.profile}>Profil</Link>
        <Link to={routes.events}>Arkiv</Link>
        <Link to={routes.career}>Karriere</Link>
        <Link to={routes.resources}>Ressurser</Link>
        <Link to={routes.contribution}>Bidra</Link>
        <Link to={routes.hobbygroups}>Interessegrupper</Link>
        <Link to={routes.wiki}>Wiki</Link>
        <Link to={routes.webshop}>Webshop</Link>
        <HeaderLogin />
      </div>
      <MainSponsor />
    </div>
  </header>
);

export default Header;
