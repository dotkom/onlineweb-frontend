import React, { Component, ContextType } from 'react';
import { Redirect, Switch } from 'react-router-dom';
import { authCallback } from '../api';
import { UserContext } from '../providers/UserProvider';

export interface IProps {}

class AuthCallback extends Component<IProps> {
  public static contextType = UserContext;
  public context!: ContextType<typeof UserContext>;

  public async componentDidMount() {
    const auth = this.context;
    const user = await authCallback();
    if (user) {
      auth.setUser(user);
    }
  }

  public render() {
    const { user } = this.context;
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
