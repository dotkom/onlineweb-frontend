import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { Provider } from 'react-redux';
import Loadable from 'react-loadable';

import Frontpage from './frontpage';
import Career from './career/';
import Contribution from './contribution';
import Hobbys from './hobbygroups';
import Resources from './resources';
import HttpError from './core/components/errors/HttpError';
import Core from './core';
import EventsRouter from 'events/components/EventsRouter';

import store from './authentication';
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
};

const LoadableProfile = Loadable({
  loader: () => import(/* webpackChunkName: "profile" */ './profile'),
  loading: () => <Spinner />,
});

const history = createBrowserHistory();

export const App = () => {
  return (
    <Provider store={store}>
      <Router history={history}>
        <Core>
          <Switch>
            <Route exact path={routes.home} component={Frontpage} />
            <Route path={routes.events} component={EventsRouter} />
            <Route path={routes.career} component={Career} />
            <Route path={routes.contribution} component={Contribution} />
            <Route path={routes.hobbygroups} component={Hobbys} />
            <Route path={routes.resources} component={Resources} />
            <Route path={routes.profile} component={LoadableProfile} />
            <Route path="*" render={() => <HttpError code={404} />} />
          </Switch>
        </Core>
      </Router>
    </Provider>
  );
};

export default App;
