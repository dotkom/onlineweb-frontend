import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Frontpage from './frontpage';
import Career from './career/';
import Hobbys from './hobbygroups';
import Resources from './resources';
import NotFound from './core/components/NotFound';
import Core from './core';
import Profile from './profile';

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

export const App = () => {
  return (
    <Router>
      <Core>
        <Switch>
          <Route exact path={routes.home} component={Frontpage} />
          <Route path={routes.career} component={Career} />
          <Route path={routes.hobbygroups} component={Hobbys} />
          <Route path={routes.resources} component={Resources} />
          <Route path={routes.profile} component={Profile} />
          <Route path="*" component={NotFound} />
        </Switch>
      </Core>
    </Router>
  );
}

export default App;
