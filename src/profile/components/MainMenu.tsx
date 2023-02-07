import classnames from 'classnames';
import { useRouter } from 'next/router';
import React from 'react';

import { getMyProfileUrl, getProfileSettingsUrl, getProfileStatisticsUrl } from 'core/appUrls';
import { Link } from 'core/components/Router';
import style from './mainMenu.less';

const MainMenu = () => {
  return (
    <div className={style.menuGrid}>
      <MenuElement text="Min Profil" {...getMyProfileUrl()} />
      <MenuElement text="Innstillinger" containsSubpages {...getProfileSettingsUrl()} />
      <MenuElement text="Statistikk" containsSubpages {...getProfileStatisticsUrl()} />
    </div>
  );
};

export interface IElementProps {
  text: string;
  href: string;
  as?: string;
  containsSubpages?: boolean;
}

export const MenuElement = ({ text, href, as, containsSubpages }: IElementProps) => {
  const { pathname } = useRouter();
  const isActive = containsSubpages ? pathname.includes(href) : pathname === href;
  return (
    <Link href={href} as={as}>
      <a className={classnames(style.menuElement, { [style.menuElementActive]: isActive })}>
        <h1>{text}</h1>
      </a>
    </Link>
  );
};

export default MainMenu;
