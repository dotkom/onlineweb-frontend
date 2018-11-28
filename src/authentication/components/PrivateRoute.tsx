import HttpError from 'core/components/errors/HttpError';
import React, { Component } from 'react';
import { Route, RouteProps } from 'react-router-dom';
import { IUserContext, UserContext } from '../providers/UserProvider';

const NotLoggedIn = () => (
  <HttpError code={401}  text="Du må være logget inn for å få tilgang til denne siden." /> 
);

class PrivateRoute extends Component<RouteProps> {
  public static contextType = UserContext;
  
  public render() {
    const { user }: IUserContext = this.context;
    const { component, ...rest } = this.props
    const view = user ? component : NotLoggedIn;
    return <Route {...rest} component={view} />
  }
}

export default PrivateRoute;
