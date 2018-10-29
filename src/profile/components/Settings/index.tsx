import React from 'react';
import { Route, Switch, RouteProps } from 'react-router-dom';

import HttpError from 'core/components/errors/HttpError';
import Mails from './Mails';
import Penalties from './Penalties';
import Privacy from './Privacy';
import Menu from './Menu';
import style from './settings.less';

const BASE_ROUTE = '/profile/settings';

export const routes = {
  main: BASE_ROUTE + '/',
  penalties: BASE_ROUTE + '/penalties',
  privacy: BASE_ROUTE + '/privacy',
  mail: BASE_ROUTE + '/mail',
  password: BASE_ROUTE + '/password',
};

const Settings = () => {
  return (
    <Switch>
      <SettingsRoute exact path={routes.main} view={Penalties} />
      <SettingsRoute path={routes.penalties} view={Penalties} />
      <SettingsRoute path={routes.privacy} view={Privacy} />
      <SettingsRoute path={routes.mail} view={Mails} />
      <SettingsRoute path={routes.password} view={Privacy} />
      <Route path="*" render={() => <HttpError code={404} text="Undersiden du leter etter finnes ikke" />} />
    </Switch>
  );
};

interface ISettingsRouteProps extends RouteProps {
  view: React.ComponentClass<any> | React.StatelessComponent<any>;
}

const SettingsRoute = ({ view, ...props }: ISettingsRouteProps) => {
  const View = view;
  return (
    <Route
      {...props}
      render={({ match, ...routeProps }) => (
        <div className={style.container}>
          <Menu path={match.path} />
          <div className={style.content}>
            <div>
              <View {...routeProps} />
            </div>
          </div>
        </div>
      )}
    />
  );
};

export default Settings;
