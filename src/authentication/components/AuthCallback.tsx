import React, { Component } from 'react';
import { Redirect, Switch } from 'react-router';
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
    if (this.props.auth && this.props.auth.user && this.props.auth.user.state) {
      return (
        <Switch>
          <Redirect to={this.props.auth.user.state} />
        </Switch>
      );
    }

    return null;
  }
}

export default ({ ...props }: IProps) => {
  return <UserContext.Consumer>{(context) => <AuthCallback {...props} auth={context} />}</UserContext.Consumer>;
};
