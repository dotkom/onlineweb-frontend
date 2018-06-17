import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';
import { createBrowserHistory } from 'history';
import { Provider } from 'react-redux';

import Frontpage from './frontpage';
import Career from './career/';
import Hobbys from './hobbygroups';
import Resources from './resources';
import HttpError from './core/components/errors/HttpError';
import Core from './core';
import Profile from './profile';

import store from './authentication';

export const routes = {
  events: '/events',
  home: '/',
  career: '/career',
  hobbygroups: '/hobbygroups',
  resources: '/resources',
  wiki: '/wiki',
  webshop: '/webshop',
  profile: '/profile'
}

const history = createBrowserHistory();


export const App = () => {
  return (
    <Provider store={store}>
      <Router history={history}>
        <Core>
          <Switch>
            <Route exact path={routes.home} component={Frontpage} />
            <Route path={routes.career} component={Career} />
            <Route path={routes.hobbygroups} component={Hobbys} />
            <Route path={routes.resources} component={Resources} />
            <Route path={routes.profile} component={Profile} />
            <Route path="*" render={() => <HttpError code={404}/>} />
          </Switch>
        </Core>
      </Router>
    </Provider>
  );
}

export default App;
