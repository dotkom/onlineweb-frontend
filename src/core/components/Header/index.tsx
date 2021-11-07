import classnames from 'classnames';
import React, { Component } from 'react';

import { DOMAIN } from 'common/constants/endpoints';
import * as appUrls from 'core/appUrls';
import { Link } from 'core/components/Router';

import style from './header.less';
import HeaderLogo from './HeaderLogo';
import HeaderLogin from './Login';
import MenuButton from './MenuButton';

export interface IState {
  isOpen: boolean;
}

class Header extends Component<{}, IState> {
  public state: IState = {
    isOpen: false,
  };

  public toggleMenu = () => this.setState(({ isOpen }) => ({ isOpen: !isOpen }));

  public closeMenu = () => this.setState({ isOpen: false });

  public scrollToForCompanies = () => {
    const element = document.getElementById('forCompaniesContainer');
    if (element !== null) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  public render() {
    const { isOpen } = this.state;
    return (
      <header className={style.header}>
        <div className={style.grid}>
          <MenuButton isOpen={isOpen} onClick={this.toggleMenu} />
          <HeaderLogo onClick={this.closeMenu} />
          <div className={classnames(style.links, { [style.dropdownMode]: isOpen })} onClick={this.closeMenu}>
            <Link {...appUrls.getMyProfileUrl()} requireLogin>
              <a>Profil</a>
            </Link>
            <Link {...appUrls.getEventsUrl()}>
              <a>Arrangementer</a>
            </Link>
            <Link {...appUrls.getCareerOpportunitiesUrl()}>
              <a>Karriere</a>
            </Link>
            <Link {...appUrls.getResourcesUrl()}>
              <a>Ressurser</a>
            </Link>
            <Link {...appUrls.getContributionsUrl()}>
              <a>Bidra</a>
            </Link>
            <Link {...appUrls.getHobbyGroupsUrl()}>
              <a>Interessegrupper</a>
            </Link>
            <a href={`${DOMAIN}/wiki/`}>Wiki</a>
            <a href={`${DOMAIN}/webshop/`}>Webshop</a>
            <a onClick={this.scrollToForCompanies}>For bedrifter</a>
          </div>
          <HeaderLogin menuIsOpen={isOpen} closeMenu={this.closeMenu} />
        </div>
      </header>
    );
  }
}

export default Header;
