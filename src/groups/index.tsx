import React, { FC } from 'react';
import { Switch } from 'react-router-dom';

import { Route } from 'core/components/Router';
import { GroupList } from './components/GroupList';
import { DetailView } from './components/DetailView';

export const routes = {
  root: '/groups',
  detail: (p: string) => `/groups/${p}`,
};

export const Groups: FC = () => (
  <Switch>
    <Route exact path={routes.root} component={GroupList} />
    <Route path={routes.detail(':id')} render={({ match }) => <DetailView groupId={Number(match.params.id)} />} />
  </Switch>
);
