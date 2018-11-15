import { routes } from 'App';
import LoginView from 'authentication/components/Login';
import { IAuthUser } from 'authentication/models/User';
import { IUserContext, UserContext } from 'authentication/providers/UserProvider';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import style from './header.less';

export interface IProps {
  // auth?: IUserContext
}

export interface IState {
  open: boolean;
}

// @injectUserContext
class Login extends Component<IProps, IState> {
  public state = {
    open: false,
  };

  constructor(props: IProps) {
    super(props);

    this.toggleDropdown = this.toggleDropdown.bind(this);
  }

  public toggleDropdown() {
    this.setState({
      open: !this.state.open,
    });
  }

  public render = () => (
    <UserContext.Consumer>
      {({ user }) =>
        user ? (
          <HeaderUser user={user} onClick={this.toggleDropdown} isOpen={this.state.open} />
        ) : (
          <LoginView onClick={this.toggleDropdown} isOpen={this.state.open} />
        )
      }
    </UserContext.Consumer>
  );
}

interface IHeaderUserProps {
  user: IAuthUser;
  onClick: (event: React.MouseEvent<HTMLButtonElement | HTMLElement>) => void;
  isOpen: boolean;
}

const HeaderUser = (props: IHeaderUserProps) => (
  <div className={style.user}>
    <button onClick={props.onClick} className={style.dropdownButton} />
    <div className={style.username}>niklasmh{false && props.user.profile.preferred_username}</div>
    {props.isOpen && (
      <div className={style.userMenu} onClick={props.onClick}>
        <Link to={routes.profile}>Min side: niklasmh{false && props.user.profile.preferred_username}</Link>
        <Link to={routes.home}>Kontakt oss</Link>
        <Link to={routes.home}>Finn brukere</Link>
        <Link to={routes.home}>Logg ut</Link>
      </div>
    )}
  </div>
);

export default Login;
