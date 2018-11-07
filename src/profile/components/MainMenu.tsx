import classnames from 'classnames';
import React, { Component, ReactChildren } from 'react';
import Router, { Link } from 'react-router-dom';
import { routes } from '../index';
import style from './menu.less';

export interface IProps {
  match: Router.match<any>;
  children: JSX.Element;
}

class MainMenu extends Component<IProps, {}> {
  public render() {
    const { path } = this.props.match;
    return (
      <div className={style.profileContainer}>
        <div className={style.menuGrid}>
          <MenuElement text="Min Profil" link={routes.personal} active={path === routes.personal} />
          <MenuElement text="Brukersøk" link={routes.search} active={path === routes.search} />
          <MenuElement text="Innstillinger" link={routes.settings} active={path === routes.settings} />
        </div>
        <div>{this.props.children}</div>
      </div>
    );
  }
}

export interface IElementProps {
  text: string;
  active: boolean;
  link: string;
}

const MenuElement = ({ text, active, link }: IElementProps) => (
  <Link to={link}>
    <div className={classnames(style.menuGridRow, { [style.menuClicked]: active })}>
      <h4 className={style.menuText}>{text}</h4>
    </div>
  </Link>
);

export default MainMenu;
