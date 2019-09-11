import React, { FC } from 'react';
import { Route, Switch } from 'react-router';

import HttpError from 'core/components/errors/HttpError';
import { EventPayment } from 'payments/components/EventPayment';
import { Wallet } from 'payments/components/Wallet';
import { WebshopPayment } from './components/WebshopPayment';

const BASE_ROUTE = '/payments';

export const routes = {
  relation: BASE_ROUTE + '/event/:id',
  webshop: BASE_ROUTE + '/webshop',
  wallet: BASE_ROUTE + '/wallet',
};

export const PaymentsRouter: FC = () => (
  <Switch>
    <Route exact path={routes.wallet} component={Wallet} />
    <Route exact path={routes.relation} render={({ match }) => <EventPayment eventId={match.params.id} />} />
    <Route exact path={routes.webshop} component={WebshopPayment} />
    <Route path="*" render={() => <HttpError code={404} />} />
  </Switch>
);
