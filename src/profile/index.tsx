import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { toQueryObject } from 'common/utils/queryString';
import MyProfile from './components/Profile';
import Search from './components/Search';
import Settings from './components/Settings';
import MainMenu from './components/MainMenu';
import HttpError from 'core/components/errors/HttpError';
import 'multirange';

const BASE_ROUTE = '/profile';

export const routes = {
  personal: BASE_ROUTE + '/me',
  search: BASE_ROUTE + '/search',
  public: BASE_ROUTE + '/public/:id',
  settings: BASE_ROUTE + '/settings',
};

class Profile extends React.Component<{}> {
  public render() {
    return (
<<<<<<< HEAD
      <section>
        <Router history={history}>
          <Switch>
            <Route
              exact
              path="/profile/me"
              render={props => (
                <MainMenu match={props.match}>
                  <Profile {...props} />
                </MainMenu>
              )}
            />
            <Route
              path="/profile/search"
              render={props => (
                <MainMenu match={props.match}>
                  <Search
                    {...props}
                    query={toQueryObject(props.location.search)}
                  />
                </MainMenu>
              )}
            />
            <Route
              path="/profile/public/:id"
              render={props => (
                <MainMenu match={props.match}>
                  <Profile {...props} />
                </MainMenu>
              )}
            />
            <Route
              path="/profile/settings"
              render={props => (
                <MainMenu match={props.match}>
                  <Settings {...props} />
                </MainMenu>
              )}
            />
          </Switch>
        </Router>
=======
      <section className="container">
        <Switch>
          <Route
            path={routes.personal}
            render={({ match }) => <MainMenu match={match}><MyProfile id={match.params.id}/></MainMenu>}
          />
          <Route
            path={routes.search}
            render={(props) => (
              <MainMenu match={props.match}>
                <Search {...props} query={toQueryObject(props.location.search)}/>
              </MainMenu>
            )}
          />
          <Route
            path={routes.public}
            render={({ match }) => <MainMenu match={match}><MyProfile id={match.params.id}  /></MainMenu>}
          />
          <Route
            path={routes.settings}
            render={(props) => <MainMenu match={props.match}><Settings /></MainMenu>}
          />
          <Route path="*" render={() => <HttpError code={404} />} />
        </Switch>
>>>>>>> Rework profile router
      </section>
    );
  }
}

<<<<<<< HEAD
export const Settings = ({ match }: any) => {
  return (
    <Switch>
      <Route
        path={match.path + '/penalties'}
        render={props => <Penalties {...props} />}
      />
      <Route
        path={match.path + '/privacy'}
        render={props => <Privacy {...props} />}
      />
      <Route
        path={match.path + '/mail'}
        render={props => <Mails {...props} />}
      />
      <Route
        path={match.path + '/password'}
        render={props => <Privacy {...props} />}
      />
    </Switch>
  );
};

export default App;
=======
export default Profile;
>>>>>>> Rework profile router
