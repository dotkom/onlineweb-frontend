import React from 'react';
import { Router, Route, Switch } from 'react-router';
import createBrowserHistory from 'history/createBrowserHistory';
import { toQueryObject } from 'common/utils/queryString';
import './less/profile.less'
import Profile from './components/Profile';
import Search from './components/Search';
import Penalties from './components/Penalties';
import Privacy from './components/Privacy';
import Mails from './components/Mails';

const history = createBrowserHistory();

class App extends React.Component<{}> {
  render() {
    return (
      <section className="container">
        <Router history={history}>
          <Switch>
            <Route
              exact
              path="/profile"
              render={props => <Profile {...props}/>}
            />
            <Route
              exact
              path="/profile/search/:username"
              render={props => <Search {...props} query={toQueryObject(props.location.search)}/>}
            />
            <Route
              path="/profile/public/:id"
              render={props => <Profile {...props} />}
            />
            <Route
              path="/profile/settings"
              render={props => <Settings {...props} />}
            />
          </Switch>
        </Router>
      </section>
    );
  }
}

export const Settings = (props: any) => {
  console.log(props)
  return(
    <Switch>
      <Route
        path={props.match.path + '/penalties'}
        render={props => <Penalties {...props} />}
      />
      <Route
        path={props.match.path + '/privacy'}
        render={props => <Privacy {...props} />}
      />
      <Route
        path={props.match.path + '/mail'}
        render={props => <Mails {...props} />}
      />
      <Route
        path={props.match.path + '/password'}
        render={props => <Privacy {...props} />}
      />
    </Switch>
  )
}

export default App;
