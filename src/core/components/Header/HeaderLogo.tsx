import { routes } from 'App';
import { STATIC_URL } from 'common/constants/endpoints';
import React from 'react';
import { Link } from 'react-router-dom';
import style from './header.less';

const HeaderLogo = () => (
  <Link to={routes.home} className={style.logo}>
    <img src={`${STATIC_URL}img/online_logo.svg`} alt="Online" />
  </Link>
);

export default HeaderLogo;
