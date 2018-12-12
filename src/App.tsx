import { createBrowserHistory } from 'history';
import React from 'react';
import ReactGA from 'react-ga';
import Loadable from 'react-loadable';
import { Router, Switch } from 'react-router-dom';

import AuthCallback from 'authentication/components/AuthCallback';
import AuthProvider from 'authentication/providers/UserProvider';

import EventsRouter from 'events/components/EventsRouter';
import Career from './career/';
import Contribution from './contribution';
import Core from './core';
import HttpError from './core/components/errors/HttpError';
import { Route } from './core/components/Router';
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
  spinner: '/spinner',
};

const LoadableProfile = Loadable({
  loader: () => import(/* webpackChunkName: "profile" */ './profile'),
  loading: () => <Spinner />,
});

const history = createBrowserHistory();

history.listen((location) => ReactGA.pageview(location.pathname));

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
            <Route path={routes.profile} component={LoadableProfile} requireLogin />
            <Route path={routes.authCallback} component={AuthCallback} />
            <Route path={routes.spinner} component={Spinner} />
            <Route path="*" render={() => <HttpError code={404} />} />
          </Switch>
        </Core>
      </Router>
    </AuthProvider>
  );
};

export default App;
