import PrivateRoute from 'authentication/components/PrivateRoute';
import React from 'react';
import { Route as DefaultRoute, RouteProps } from 'react-router-dom';

export interface IProps extends RouteProps {
  requireLogin?: boolean;
}

const Route = ({ requireLogin, ...props }: IProps) => {
  return requireLogin ? <PrivateRoute {...props} /> : <DefaultRoute {...props} />;
};

export default Route;
