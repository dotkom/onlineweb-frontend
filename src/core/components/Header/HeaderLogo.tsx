import { routes } from 'App';
import { STATIC_URL } from 'common/constants/endpoints';
import { Link } from 'core/components/Router';
import React from 'react';
import style from './header.less';

export interface IProps {
  onClick: (event: React.MouseEvent<HTMLAnchorElement>) => void;
}

const HeaderLogo = (props: IProps) => (
  <Link to={routes.home} className={style.logo} {...props}>
    <img src={`${STATIC_URL}img/online_logo.svg`} alt="Online" />
  </Link>
);

export default HeaderLogo;
