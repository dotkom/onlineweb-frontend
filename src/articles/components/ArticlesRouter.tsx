import HttpError from 'core/components/errors/HttpError';
import { Route } from 'core/components/Router';
import React from 'react';
import { Switch } from 'react-router-dom';
import { ArticleView } from './ArticleView';

const BASE_URL = '/articles';

export const routes = {
  detail: BASE_URL + '/',
};

const EventsRouter = ({}) => (
  <Switch>
    <Route path={routes.detail + ':id'} render={({ match }) => <ArticleView articleId={match.params.id} />} />
    <Route path="*" render={() => <HttpError code={404} />} />
  </Switch>
);

export default EventsRouter;
