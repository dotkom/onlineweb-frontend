import React from 'react';
import { Switch, Route } from 'react-router-dom';
import EventsContainer from './EventsContainer';
import DetailView from './DetailView';
import HttpError from 'core/components/errors/HttpError';

export const routes = {
  root: '/events',
  detail: '/events/:id',
};

const EventsRouter = ({}) => (
  <Switch>
    <Route exact path={routes.root} component={EventsContainer} />
    <Route path={routes.detail} render={({ match }) => <DetailView eventId={match.params.id} />} />
    <Route path="*" render={() => <HttpError code={404} />} />
  </Switch>
);

export default EventsRouter;
