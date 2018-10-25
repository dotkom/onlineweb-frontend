import { createBrowserHistory } from 'history';
import React from 'react';
import Loadable from 'react-loadable';
import { Route, Router, Switch } from 'react-router-dom';

import AuthCallback from 'authentication/components/AuthCallback';
import AuthProvider from 'authentication/providers/UserProvider';

import EventsRouter from 'events/components/EventsRouter';
import Career from './career/';
import Contribution from './contribution';
import Core from './core';
import HttpError from './core/components/errors/HttpError';
import Frontpage from './frontpage';
import Hobbys from './hobbygroups';
import Resources from './resources';

import Spinner from 'common/components/Spinner';


export const routes = {
  events: '/events',
  home: '/',
  career: '/career',
  contribution: '/contribution',
  hobbygroups: '/hobbygroups',
  resources: '/resources',
  wiki: '/wiki',
  webshop: '/webshop',
  profile: '/profile',
  authCallback: '/auth/callback',
};

const LoadableProfile = Loadable({
  loader: () => import(/* webpackChunkName: "profile" */ './profile'),
  loading: () => <Spinner />,
});

const history = createBrowserHistory();

export const App = () => {
  return (
    <AuthProvider>
      <Router history={history}>
        <Core>
          <Switch>
            <Route exact path={routes.home} component={Frontpage} />
            <Route path={routes.events} component={EventsRouter} />
            <Route path={routes.career} component={Career} />
            <Route path={routes.contribution} component={Contribution} />
            <Route path={routes.hobbygroups} component={Hobbys} />
            <Route path={routes.resources} component={Resources} />
            <Route path={routes.profile} component={Profile} />
            <Route path={routes.authCallback} component={AuthCallback} />
            <Route path="*" render={() => <HttpError code={404}/>} />
          </Switch>
        </Core>
      </Router>
    </AuthProvider>
  );
};

export default App;
