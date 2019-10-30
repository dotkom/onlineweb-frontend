import HttpError from 'core/components/errors/HttpError';
import { Route } from 'core/components/Router';
import React from 'react';
import { Switch } from 'react-router-dom';
import { DetailView } from './DetailView';

const BASE_URL = '/company';

export const routes = {
  detail: BASE_URL + '/',
};

const CompanyRouter = ({}) => (
  <Switch>
    <Route path={routes.detail + ':id'} render={({ match }) => <DetailView id={match.params.id} />} />
    <Route path="*" render={() => <HttpError code={404} />} />
  </Switch>
);

export default CompanyRouter;
