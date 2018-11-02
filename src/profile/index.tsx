import React from 'react';
import { Route, Switch, RouteProps } from 'react-router-dom';
import MyProfile from './components/Profile';
import Search from './components/Search';
import Settings from './components/Settings';
import MainMenu from './components/MainMenu';
import HttpError from 'core/components/errors/HttpError';
import 'multirange';
import qs from 'query-string';

const BASE_ROUTE = '/profile';

export const routes = {
  personal: BASE_ROUTE + '/',
  search: BASE_ROUTE + '/search',
  public: BASE_ROUTE + '/public/:id',
  settings: BASE_ROUTE + '/settings',
};

class Profile extends React.Component<{}> {
  public render() {
    return (
      <section>
        <Switch>
          <ProfileRoute exact path={routes.personal} view={MyProfile} />
          <ProfileRoute path={routes.search} view={Search} />
          <ProfileRoute path={routes.public} view={MyProfile} />
          <ProfileRoute path={routes.settings} view={Settings} />
          <Route path="*" render={() => <HttpError code={404} />} />
        </Switch>
      </section>
    );
  }
}

interface IProfileRouteProps extends RouteProps {
  view: React.ComponentClass<any> | React.StatelessComponent<any>;
}

const ProfileRoute = ({ view, ...props }: IProfileRouteProps) => {
  const View = view;
  return (
    <Route
      {...props}
      render={({ match, location, ...routeProps }) => (
        <MainMenu match={match}>
          <View params={qs.parse(location.search)} {...routeProps}  />
        </MainMenu>
      )}
    />
  );
};

export default Profile;
