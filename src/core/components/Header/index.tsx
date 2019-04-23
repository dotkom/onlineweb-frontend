import classnames from 'classnames';
import React, { Component } from 'react';

import { routes } from 'App';
import { Link } from 'core/components/Router';

import style from './header.less';
import HeaderLogo from './HeaderLogo';
import HeaderLogin from './Login';
import MainSponsor from './MainSponsor';
import MenuButton from './MenuButton';

export interface IProps {}

export interface IState {
  isOpen: boolean;
}

class Header extends Component<IProps, IState> {
  public state: IState = {
    isOpen: false,
  };

  public toggleMenu = () => this.setState(({ isOpen }) => ({ isOpen }));

  public closeMenu = () => this.setState({ isOpen: false });

  public render() {
    const { isOpen } = this.state;
    return (
      <header className={style.header}>
        <div className={style.grid}>
          <MenuButton isOpen={isOpen} onClick={this.toggleMenu} />
          <HeaderLogo onClick={this.closeMenu} />
          <div className={classnames(style.links, { [style.dropdownMode]: isOpen })} onClick={this.closeMenu}>
            <Link to={routes.profile} requireLogin>
              Profil
            </Link>
            <Link to={routes.events}>Arkiv</Link>
            <Link to={routes.career}>Karriere</Link>
            <Link to={routes.resources}>Ressurser</Link>
            <Link to={routes.contribution}>Bidra</Link>
            <Link to={routes.hobbygroups}>Interessegrupper</Link>
            <Link to={routes.wiki}>Wiki</Link>
            <Link to={routes.webshop}>Webshop</Link>
          </div>
          <HeaderLogin />
          <MainSponsor />
        </div>
      </header>
    );
  }
}

export default Header;
