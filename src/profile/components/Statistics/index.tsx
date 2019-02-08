import React from 'react';
import { Switch } from 'react-router-dom';

import HttpError from 'core/components/errors/HttpError';
import { IRouteProps, Route } from 'core/components/Router';
import Events from './Events';
import Main from './Main';
import Orders from './Orders';

const BASE_ROUTE = '/profile/statistics';

export const routes = {
  main: BASE_ROUTE + '/',
  events: BASE_ROUTE + '/events',
  orders: BASE_ROUTE + '/orders',
};

const Settings = () => {
  return (
    <Switch>
      <StatisticsRoute exact path={routes.main} view={Main} />
      <StatisticsRoute path={routes.orders} view={Orders} />
      <StatisticsRoute path={routes.events} view={Events} />
      <Route path="*" render={() => <HttpError code={404} text="Undersiden du leter etter finnes ikke" />} />
    </Switch>
  );
};

interface ISettingsRouteProps extends IRouteProps {
  view: React.ComponentClass<any> | React.StatelessComponent<any>;
}

const StatisticsRoute = ({ view, ...props }: ISettingsRouteProps) => {
  const View = view;
  return <Route {...props} render={({ match, ...routeProps }) => <View {...routeProps} />} />;
};

export default Settings;
