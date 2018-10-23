import React, { Component } from 'react';
import { authCallback } from '../api';
import { injectUserContext, IUserContext } from '../providers/UserProvider';

export interface IProps {
  auth?: IUserContext;
}

@injectUserContext
class AuthCallback extends Component<IProps> {
  async componentDidMount() {
    const { auth } = this.props;
    const user = await authCallback();
    auth && auth.setAuth(user);
  }

  render() {
    return (
      <div>
        AuthCallback
      </div>
    )
  }
}

export default AuthCallback;
