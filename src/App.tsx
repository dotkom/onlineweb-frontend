import { createBrowserHistory } from 'history';
import React from 'react';
import Loadable from 'react-loadable';
import { Provider } from 'react-redux';
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
import store from './authentication';

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
    <Provider store={store}>
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
              <Route path={routes.authCallback} component={AuthCallback} />
              <Route path={routes.profile} component={LoadableProfile} />
              <Route path="*" render={() => <HttpError code={404} />} />
            </Switch>
          </Core>
        </Router>
      </AuthProvider>
    </Provider>
  );
};

export default App;
