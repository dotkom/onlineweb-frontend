import HttpError from 'core/components/errors/HttpError';
import { IRouteProps, Route } from 'core/components/Router';
import { History } from 'history';
import qs from 'query-string';
import React from 'react';
import { match as IMatch, Switch } from 'react-router-dom';
import MainMenu from './components/MainMenu';
import UserProfile from './components/Profile';
import { PublicProfile } from './components/Profile/PublicProfile';
import Search from './components/Search';
import Settings from './components/Settings';
import Statistics from './components/Statistics';
import UserProfileProvider from './providers/UserProfile';

const BASE_ROUTE = '/profile';

export const routes = {
  personal: BASE_ROUTE + '/',
  search: BASE_ROUTE + '/search',
  public: BASE_ROUTE + '/public',
  settings: BASE_ROUTE + '/settings',
  statistics: BASE_ROUTE + '/statistics',
};

const ProfileRouter = () => {
  return (
    <UserProfileProvider>
      <Switch>
        <ProfileRoute exact path={routes.personal} view={UserProfile} />
        <ProfileRoute path={routes.search} view={Search} />
        <ProfileRoute path={routes.public + '/:id'} view={PublicProfileContainer} />
        <ProfileRoute path={routes.settings} view={Settings} />
        <ProfileRoute path={routes.statistics} view={Statistics} />
        <Route path="*" render={() => <HttpError code={404} />} />
      </Switch>
    </UserProfileProvider>
  );
};

export interface IProfileProps<T = {}> {
  params: qs.OutputParams;
  match: IMatch<T>;
  history: History;
}

interface IProfileRouteProps extends IRouteProps {
  view: React.ComponentClass<any> | React.StatelessComponent<any>;
}

const ProfileRoute = ({ view, ...props }: IProfileRouteProps) => {
  const View = view;
  return (
    <Route
      {...props}
      render={({ match, location, history }) => (
        <>
          <MainMenu match={match} />
          <View params={qs.parse(location.search)} match={match} history={history} />
        </>
      )}
    />
  );
};

const PublicProfileContainer = (props: IProfileProps<{ id: string }>) => {
  const profileId = Number(props.match.params.id);
  return <PublicProfile profileId={profileId} />;
};

export default ProfileRouter;
