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

  public render() {
    const { isOpen } = this.state;
    return (
      <header className={style.header}>
        <div className={style.grid}>
          <MenuButton isOpen={isOpen} onClick={this.toggleMenu} />
          <HeaderLogo onClick={this.closeMenu} />
          <div className={classnames(style.links, { [style.dropdownMode]: isOpen })} onClick={this.closeMenu}>
            <Link {...appUrls.getEventsUrl()}>
              <a>Arrangementer</a>
            </Link>
            <Link {...appUrls.getCareerOpportunitiesUrl()}>
              <a>Karriere</a>
            </Link>
            <Link {...appUrls.getHobbyGroupsUrl()}>
              <a>Interessegrupper</a>
            </Link>
            <a href={'https://wiki.online.ntnu.no'}>Wiki</a>
            <a href={`${DOMAIN}/webshop/`}>Webshop</a>
          </div>
          <HeaderLogin menuIsOpen={isOpen} closeMenu={this.closeMenu} />
        </div>
      </header>
    );
  }
}

export default Header;
