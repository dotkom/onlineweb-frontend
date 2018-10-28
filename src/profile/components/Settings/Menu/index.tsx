import React from 'react';
import { routes } from '..';
import style from './menu.less';
import Tab from './Tab';

export interface IProps {
  path: string;
}

const Menu = ({ path }: IProps) => (
  <div className={style.menu}>
    <Tab path={routes.main} active={path === routes.main} text="Informasjon" />
    <Tab path={routes.mail} active={path === routes.mail} text="E-Post" />
    <Tab path={routes.password} active={path === routes.password} text="Passord" />
    <Tab path={routes.penalties} active={path === routes.penalties} text="Prikker og suspensjoner" />
    <Tab path={routes.privacy} active={path === routes.privacy} text="Personvern" />
    <Tab path={routes.accessCard} active={path === routes.accessCard} text="Adgangskort (NTNU)" />
    <Tab path={routes.notifications} active={path === routes.notifications} text="Notifikasjoner" />
  </div>
);

export default Menu;
