import React, { Props } from 'react';
import { Route, Switch } from 'react-router-dom';

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
  return(
    <Switch>
      <Route
        exact
        path={routes.main}
        render={(props) => <Wrapper path={props.match.path}></Wrapper>}
      />
      <Route
        path={routes.penalties}
        render={(props) => <Wrapper path={props.match.path}><Penalties {...props} /></Wrapper>}
      />
      <Route
        path={routes.privacy}
        render={(props) => <Wrapper path={props.match.path}><Privacy {...props} /></Wrapper>}
      />
      <Route
        path={routes.mail}
        render={(props) => <Wrapper path={props.match.path}><Mails {...props} /></Wrapper>}
      />
      <Route
        path={routes.password}
        render={(props) => <Wrapper path={props.match.path}><Privacy {...props} /></Wrapper>}
      />
    </Switch>
  );
};

const Wrapper = ({ path, children }: { path: string } & Props<undefined>) => (
  <div className={style.container}>
    <Menu path={path} />
    <div className={style.content}>
      <div>
        { children }
      </div>
    </div>
  </div>
);

export default Settings;
