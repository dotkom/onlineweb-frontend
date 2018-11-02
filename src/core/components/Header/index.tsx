import React from 'react';
import { Link } from 'react-router-dom';
import { STATIC_URL } from 'common/constants/endpoints';
import { routes } from 'App';
import MainSponsor from './MainSponsor';
import HeaderLogo from './HeaderLogo';
import Authenticate from 'authentication/components/Authenticate';
import style from './header.less';

export const Header = () => (
  <header className={style.header}>
    <div className={style.grid}>
      <HeaderLogo />
      <div className={style.links}>
        <div className={style.item}>
          <Link to={routes.events}>Arkiv</Link>
        </div>
        <div className={style.item}>
          <Link to={routes.career}>Karriere</Link>
        </div>
        <div className={style.item}>
          <Link to={routes.resources}>Ressurser</Link>
        </div>
        <div className={style.item}>
          <Link to={routes.hobbygroups}>Interessegrupper</Link>
        </div>
        <Authenticate authentication={'view_wiki'}>
          <div className={style.item}>
            <Link to={routes.wiki}>Wiki</Link>
          </div>
        </Authenticate>
        <div className={style.item}>
          <Link to={routes.webshop}>Webshop</Link>
        </div>
      </div>
      <MainSponsor />
    </div>
  </header>
);

export default Header;
