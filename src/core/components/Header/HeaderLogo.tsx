import React from 'react';
import { Link } from 'react-router-dom';
import { STATIC_URL } from 'common/constants/endpoints';
import { routes } from 'App';
import style from './header.less';

const HeaderLogo = () => (
  <Link to={routes.home}>
    <img className={style.logo} src={`${STATIC_URL}img/online_logo.svg`} alt="Online" />
  </Link>
);

export default HeaderLogo;
