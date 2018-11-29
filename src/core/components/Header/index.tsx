import { routes } from 'App';
import classnames from 'classnames';
import { Link } from 'core/components/Router';
import React, { Component } from 'react';
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

  constructor(props: IProps) {
    super(props);

    this.toggleMenu = this.toggleMenu.bind(this);
    this.closeMenu = this.closeMenu.bind(this);
  }

  public toggleMenu() {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  }

  public closeMenu() {
    this.setState({
      isOpen: false,
    });
  }

  public render() {
    return (
      <header className={style.header}>
        <div className={style.grid}>
          <MenuButton isOpen={this.state.isOpen} onClick={this.toggleMenu} />
          <HeaderLogo onClick={this.closeMenu} />
          <div
            className={classnames(style.links, { [style.dropdownMode]: this.state.isOpen })}
            onClick={this.closeMenu}
          >
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
