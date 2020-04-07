import React from 'react';

import classnames from 'classnames';
import { useRouter } from 'next/router';

import { Link } from 'core/components/Router';
import style from './mainMenu.less';

const MainMenu = () => {
  return (
    <div className={style.menuGrid}>
      <MenuElement text="Min Profil" href="/profile" />
      <MenuElement text="Brukersøk" href="/profile/search" />
      <MenuElement text="Innstillinger" href="/profile/settings" />
      <MenuElement text="Statistikk" href="/profile/statistics" />
    </div>
  );
};

export interface IElementProps {
  text: string;
  href: string;
}

export const MenuElement = ({ text, href }: IElementProps) => {
  const { pathname } = useRouter();
  const isActive = pathname === href;
  return (
    <Link href={href}>
      <a className={classnames(style.menuElement, { [style.menuElementActive]: isActive })}>
        <h1>{text}</h1>
      </a>
    </Link>
  );
};

export default MainMenu;
