import React, { Component, ContextType } from 'react';

import LoginView from 'authentication/components/Login';
import { IAuthUser } from 'authentication/models/User';
import { UserContext } from 'authentication/providers/UserProvider';
import { getMyProfileUrl, getPaymentWalletUrl } from 'core/appUrls';
import { Link } from 'core/components/Router';

import style from './header.less';

export interface IState {
  open: boolean;
}

interface IProps {
  menuIsOpen?: boolean;
  closeMenu?: () => void;
}

class Login extends Component<IProps, IState> {
  public static contextType = UserContext;
  public context!: ContextType<typeof UserContext>;

  public state: IState = {
    open: false,
  };

  public toggleDropdown = () => {
    if (this.props.menuIsOpen && this.props.closeMenu) {
      this.props.closeMenu();
    }
    this.setState({
      open: !this.state.open,
    });
  };

  public render() {
    const { user, logout } = this.context;
    return user ? (
      <HeaderUser user={user} logout={logout} onClick={this.toggleDropdown} isOpen={this.state.open} />
    ) : (
      <LoginView onClick={this.toggleDropdown} isOpen={this.state.open} />
    );
  }
}

interface IHeaderUserProps {
  user: IAuthUser;
  logout: () => void;
  onClick: (event: React.MouseEvent<HTMLButtonElement | HTMLElement>) => void;
  isOpen: boolean;
}

const HeaderUser = (props: IHeaderUserProps) => (
  <div className={style.user}>
    <button onClick={props.onClick} className={style.dropdownButton} />
    <div className={style.username}>{props.user.profile.preferred_username}</div>
    {props.isOpen && (
      <div className={style.userMenu} onClick={props.onClick}>
        <Link {...getMyProfileUrl()}>
          <a>Min side: {props.user.profile.preferred_username}</a>
        </Link>
        <Link href="/dashboard">
          <a>Dashboard</a>
        </Link>
        <Link {...getPaymentWalletUrl()}>
          <a>Saldo</a>
        </Link>
        <Link href="#">
          <a>Kontakt oss</a>
        </Link>
        <Link {...getMyProfileUrl()}>
          <a>Finn brukere</a>
        </Link>
        <Link href="#">
          <a onClick={props.logout}>Logg ut</a>
        </Link>
      </div>
    )}
  </div>
);

export default Login;
