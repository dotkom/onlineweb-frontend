import classnames from 'classnames';
import { Link } from 'core/components/Router';
import React, { Component } from 'react';
import Router from 'react-router-dom';
import { routes } from '../index';
import style from './mainMenu.less';

export interface IProps {
  match: Router.match<any>;
}

class MainMenu extends Component<IProps, {}> {
  public render() {
    const { path } = this.props.match;
    return (
      <div className={style.menuGrid}>
        <MenuElement text="Min Profil" link={routes.personal} active={path === routes.personal} />
        <MenuElement text="Brukersøk" link={routes.search} active={path === routes.search} />
        <MenuElement text="Innstillinger" link={routes.settings} active={path === routes.settings} />
        <MenuElement text="Statistikk" link={routes.statistics} active={path === routes.statistics} />
      </div>
    );
  }
}

export interface IElementProps {
  text: string;
  active: boolean;
  link: string;
}

export const MenuElement = ({ text, active, link }: IElementProps) => (
  <Link to={link} className={classnames(style.menuElement, { [style.menuElementActive]: active })}>
    <h1>{text}</h1>
  </Link>
);

export default MainMenu;
