import React from 'react';
import style from './menu.less';
import Tab from './Tab';

const Menu = () => (
  <div className={style.menu}>
    <Tab href="/profile/settings/" text="Informasjon" />
    <Tab href="/profile/settings/mail" text="E-Post" />
    <Tab href="/profile/settings/password" text="Passord" />
    <Tab href="/profile/settings/penalties" text="Prikker og suspensjoner" />
    <Tab href="/profile/settings/privacy" text="Personvern" />
    <Tab href="/profile/settings/access-card" text="Adgangskort (NTNU)" />
    <Tab href="/profile/settings/notifications" text="Notifikasjoner" />
  </div>
);

export default Menu;
