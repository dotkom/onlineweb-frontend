import PrivateRoute from 'authentication/components/PrivateRoute';
import React from 'react';
import { Route as DefaultRoute, RouteProps } from 'react-router-dom';

export interface IRouteProps extends RouteProps {
  requireLogin?: boolean;
}

export const Route = ({ requireLogin, ...props }: IRouteProps) => {
  return requireLogin ? <PrivateRoute {...props} /> : <DefaultRoute {...props} />;
};
