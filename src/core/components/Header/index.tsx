import classnames from 'classnames';
import React, { Component } from 'react';

import { Link } from 'core/components/Router';

import style from './header.less';
import HeaderLogo from './HeaderLogo';
import HeaderLogin from './Login';
import MenuButton from './MenuButton';

export interface IProps {}

export interface IState {
  isOpen: boolean;
}

class Header extends Component<IProps, IState> {
  public state: IState = {
    isOpen: false,
  };

  public toggleMenu = () => this.setState(({ isOpen }) => ({ isOpen: !isOpen }));

  public closeMenu = () => this.setState({ isOpen: false });

  public render() {
    const { isOpen } = this.state;
    return (
      <header className={style.header}>
        <div className={style.grid}>
          <MenuButton isOpen={isOpen} onClick={this.toggleMenu} />
          <HeaderLogo onClick={this.closeMenu} />
          <div className={classnames(style.links, { [style.dropdownMode]: isOpen })} onClick={this.closeMenu}>
            <Link href="/profile" requireLogin>
              <a>Profil</a>
            </Link>
            <Link href="/events">
              <a>Arkiv</a>
            </Link>
            <Link href="/career">
              <a>Karriere</a>
            </Link>
            <Link href="/resources">
              <a>Ressurser</a>
            </Link>
            <Link href="/contribution">
              <a>Bidra</a>
            </Link>
            <Link href="/hobbygroups">
              <a>Interessegrupper</a>
            </Link>
            <Link href="/wiki">
              <a>Wiki</a>
            </Link>
            <Link href="/webshop">
              <a>Webshop</a>
            </Link>
          </div>
          <HeaderLogin />
        </div>
      </header>
    );
  }
}

export default Header;
