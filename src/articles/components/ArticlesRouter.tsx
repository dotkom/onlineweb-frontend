import HttpError from 'core/components/errors/HttpError';
import { Route } from 'core/components/Router';
import React from 'react';
import { Switch } from 'react-router-dom';
import { ArticleView } from './ArticleView';

export const routes = {
  detail: '/articles/:id',
};

const EventsRouter = ({}) => (
  <Switch>
    <Route path={routes.detail} render={({ match }) => <ArticleView articleId={match.params.id} />} />
    <Route path="*" render={() => <HttpError code={404} />} />
  </Switch>
);

export default EventsRouter;
