import React from 'react';
import { RouteProps, Switch } from 'react-router-dom';

import HttpError from 'core/components/errors/HttpError';
import Route from 'core/components/Route';
import { IProfileProps } from 'profile';
import AccessCard from './AccessCard';
import Mails from './Mails';
import Menu from './Menu';
import Penalties from './Penalties';
import Privacy from './Privacy';
import style from './settings.less';
import SettingsInfo from './SettingsInfo';

const BASE_ROUTE = '/profile/settings';

export const routes = {
  main: BASE_ROUTE + '/',
  penalties: BASE_ROUTE + '/penalties',
  privacy: BASE_ROUTE + '/privacy',
  mail: BASE_ROUTE + '/mail',
  password: BASE_ROUTE + '/password',
  accessCard: BASE_ROUTE + '/access-card',
};

const Settings = (_: IProfileProps) => {
  return (
    <Switch>
      <SettingsRoute exact path={routes.main} view={SettingsInfo} />
      <SettingsRoute path={routes.penalties} view={Penalties} />
      <SettingsRoute path={routes.privacy} view={Privacy} />
      <SettingsRoute path={routes.mail} view={Mails} />
      <SettingsRoute path={routes.password} view={Privacy} />
      <SettingsRoute path={routes.accessCard} view={AccessCard} />
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
          <div className={style.settings}>
            <View {...routeProps} />
          </div>
        </div>
      )}
    />
  );
};

export default Settings;
