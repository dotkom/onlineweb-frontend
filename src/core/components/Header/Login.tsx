import { routes } from 'App';
import LoginView from 'authentication/components/Login';
import { IAuthUser } from 'authentication/models/User';
import { IUserContext, UserContext } from 'authentication/providers/UserProvider';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import style from './header.less';

export interface IState {
  open: boolean;
}

class Login extends Component<{}, IState> {
  public static contextType = UserContext;

  public state: IState = {
    open: false,
  };

  public toggleDropdown = () => {
    this.setState({
      open: !this.state.open,
    });
  };

  public render() {
    const { user, logout }: IUserContext = this.context;
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
        <Link to={routes.profile}>Min side: {props.user.profile.preferred_username}</Link>
        <Link to={routes.home}>Kontakt oss</Link>
        <Link to={routes.home}>Finn brukere</Link>
        <Link to={routes.home} onClick={props.logout}>
          Logg ut
        </Link>
      </div>
    )}
  </div>
);

export default Login;
