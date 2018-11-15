import LoginView from 'authentication/components/Login';
import { IAuthUser } from 'authentication/models/User';
import { UserContext } from 'authentication/providers/UserProvider';
import React, { Component } from 'react';
import style from './header.less';

/*
export interface IProps {
  auth?: IUserContext
}
*/

// @injectUserContext
class Login extends Component<{}> {
  public render = () => (
    <UserContext.Consumer>{({ user }) => (user ? <HeaderUser {...user} /> : <LoginView />)}</UserContext.Consumer>
  );
}

const HeaderUser = (user: IAuthUser) => (
  <div className={style.user}>
    <button />
    <div className={style.username}>{user.profile.preferred_username}</div>
  </div>
);

export default Login;
