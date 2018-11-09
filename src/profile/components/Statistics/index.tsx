import React from 'react';
import { Route, RouteProps, Switch } from 'react-router-dom';

import HttpError from 'core/components/errors/HttpError';
import { IProfileProps } from 'profile';
import { MenuElement } from '../MainMenu';
import Menu from '../Settings/Menu';
import style from '../Settings/settings.less';
import Orders from './Orders';


const BASE_ROUTE = '/profile/statistics';

export const routes = {
  main: BASE_ROUTE + '/',
};

const Settings = (props: IProfileProps) => {
  return (
    <Switch>
      <StatisticsRoute exact path={routes.main} view={Orders} />
      <Route path="*" render={() => <HttpError code={404} text="Undersiden du leter etter finnes ikke" />} />
    </Switch>
  );
};

interface ISettingsRouteProps extends RouteProps {
  view: React.ComponentClass<any> | React.StatelessComponent<any>;
}

const StatisticsRoute = ({ view, ...props }: ISettingsRouteProps) => {
  const View = view;
  return (
    <Route
      {...props}
      render={({ match, ...routeProps }) => <View {...routeProps} />}
    />
  );
};

export default Settings;
