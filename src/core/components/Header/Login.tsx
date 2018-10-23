import React, { Component } from 'react';
import { UserContext } from 'authentication/providers/UserProvider';
import LoginView from 'authentication/components/Login';
import { IAuthUser } from 'authentication/models/User';

/*
export interface IProps {
  auth?: IUserContext
}
*/

// @injectUserContext
class Login extends Component<{}> {
  public render = () => (
    <UserContext.Consumer>
      {({ user }) => (
        <div>{ (user) ? <HeaderUser {...user} />: <LoginView /> }</div>
      )}
    </UserContext.Consumer>
  );
};

const HeaderUser = (user: IAuthUser) => (
  <div>
    { user.profile.preferred_username }
  </div>
);

export default Login;
