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
import MainMenu from './components/MainMenu';
import 'multirange';

const history = createBrowserHistory();

class App extends React.Component<{}> {
  render() {
    return (
      <section className="container">
        <Router history={history}>
          <Switch>
            <Route
              exact
              path="/profile/me"
              render={props => <MainMenu match={props.match}><Profile {...props}/></MainMenu>}
            />
            <Route
              path="/profile/search"
              render={props => <MainMenu match={props.match}><Search {...props} query={toQueryObject(props.location.search)}/></MainMenu>}
            />
            <Route
              path="/profile/public/:id"
              render={props => <MainMenu match={props.match}><Profile {...props} /></MainMenu>}
            />
            <Route
              path="/profile/settings"
              render={props => <MainMenu match={props.match}><Settings {...props} /></MainMenu>}
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
