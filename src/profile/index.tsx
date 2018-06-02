import React from 'react';
import { Router, Route, Switch } from 'react-router';
import createBrowserHistory from 'history/createBrowserHistory';
import { toQueryObject } from 'common/utils/queryString';
import './less/profile.less'
import Profile from './components/Profile';
import Search from './components/Search';

const history = createBrowserHistory();

class App extends React.Component<{}> {
  render() {
    return (
      <section className="container">
        <Router history={history}>
          <Switch>
            <Route
              exact
              path="/profile/"
              render={props => <Profile {...props}/>}
            />
            <Route
              exact
              path="/profile/search/username"
              render={props => <Search {...props} query={toQueryObject(props.location.search)}/>}
            />
            <Route
              path="/profile/:id"
              render={props => <Profile {...props} />}
            />
          </Switch>
        </Router>
      </section>
    );
  }
}

export default App;
