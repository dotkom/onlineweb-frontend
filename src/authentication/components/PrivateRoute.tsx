import React, { Component } from 'react';
import { Route, RouteProps } from 'react-router-dom';

import { NotAuthenticated } from 'core/components/errors/NotAuthenticated';

import { IUserContext, UserContext } from '../providers/UserProvider';

class PrivateRoute extends Component<RouteProps> {
  public static contextType = UserContext;

  public render() {
    const { user }: IUserContext = this.context;
    const { component, ...rest } = this.props;
    const view = user ? component : NotAuthenticated;
    return <Route {...rest} component={view} />;
  }
}

export default PrivateRoute;
