import React from 'react';

import { getFrontPageUrl } from 'core/appUrls';
import { Link } from 'core/components/Router';

import style from './header.less';

interface IProps {
  onClick: (event: React.MouseEvent<HTMLAnchorElement>) => void;
}

const HeaderLogo = (props: IProps) => {
  return (
    <Link {...getFrontPageUrl()}>
      <a className={style.logo} {...props}>
        <img src="/img/abakus_logo_white.png" alt="Online" />
      </a>
    </Link>
  );
};

export default HeaderLogo;
