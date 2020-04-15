import React from 'react';

import { STATIC_URL } from 'common/constants/endpoints';
import { getFrontPageUrl } from 'core/appUrls';
import { Link } from 'core/components/Router';

import style from './header.less';

export interface IProps {
  onClick: (event: React.MouseEvent<HTMLAnchorElement>) => void;
}

const HeaderLogo = (props: IProps) => {
  const src = `${STATIC_URL}img/online_logo.svg`;
  return (
    <Link {...getFrontPageUrl()}>
      <a className={style.logo} {...props}>
        <img src={src} alt="Online" />
      </a>
    </Link>
  );
};

export default HeaderLogo;
