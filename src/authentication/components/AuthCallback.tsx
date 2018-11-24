import React, { Component } from 'react';
import { Redirect, Switch } from 'react-router';
import { authCallback } from '../api';
import { IUserContext, UserContext } from '../providers/UserProvider';

export interface IProps {}

class AuthCallback extends Component<IProps> {
  public static contextType = UserContext;

  public async componentDidMount() {
    const auth: IUserContext = this.context;
    const user = await authCallback();
    auth.setUser(user);
  }

  public render() {
    const { user }: IUserContext = this.context;
    return (
      <>
        {user && user.state ? (
          <Switch>
            <Redirect to={user.state} />
          </Switch>
        ) : null}
      </>
    );
  }
}

export default AuthCallback;
