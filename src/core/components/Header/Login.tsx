import LoginView from 'authentication/components/Login';
import { IAuthUser } from 'authentication/models/User';
import { UserContext } from 'authentication/providers/UserProvider';
import React, { Component } from 'react';
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
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  isOpen: boolean;
}

const HeaderUser = (props: IHeaderUserProps) => (
  <div className={style.user}>
    <button onClick={props.onClick} className={style.dropdownButton} />
    <div className={style.username}>{false && props.user.profile.preferred_username}</div>
    {props.isOpen && <div className={style.userMenu}>Dropdown</div>}
  </div>
);

export default Login;
