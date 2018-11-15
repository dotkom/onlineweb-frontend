import LoginView from 'authentication/components/Login';
import { IAuthUser } from 'authentication/models/User';
import { IUserContext, UserContext } from 'authentication/providers/UserProvider';
import React, { Component } from 'react';

class Login extends Component<{}> {
  public static contextType = UserContext;

  public render() {
    const { user }: IUserContext = this.context;
    return <div>{user ? <HeaderUser user={user} /> : <LoginView />}</div>;
  }
}

export interface IProps {
  user: IAuthUser;
}

const HeaderUser = ({ user }: IProps) => <div>{user.profile.preferred_username}</div>;

export default Login;
