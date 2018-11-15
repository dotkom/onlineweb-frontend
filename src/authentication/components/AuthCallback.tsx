import React, { Component } from 'react';
import { authCallback } from '../api';
import { IUserContext, UserContext } from '../providers/UserProvider';

export interface IProps {
  auth?: IUserContext;
}

class AuthCallback extends Component<IProps> {
  public async componentDidMount() {
    const { auth } = this.props;
    if (auth) {
      const user = await authCallback();
      auth.setUser(user);
    }
  }

  public render() {
    return <div>thonkery</div>;
  }
}

export default ({ ...props }: IProps) => {
  return <UserContext.Consumer>{(context) => <AuthCallback {...props} auth={context} />}</UserContext.Consumer>;
};
