import React, { FC } from 'react';
import { Route, Switch } from 'react-router';

import HttpError from 'core/components/errors/HttpError';
import { EventPayment } from 'payments/components/EventPayment';
import { Wallet } from 'payments/components/Wallet';

const BASE_ROUTE = '/payments';

export const routes = {
  relation: BASE_ROUTE + '/:event',
  wallet: BASE_ROUTE + '/wallet',
};

export const PaymentsRouter: FC = () => (
  <Switch>
    <Route exact path={routes.wallet} component={Wallet} />
    <Route exact path={routes.relation} render={({ match }) => <EventPayment eventId={match.params.event} />} />
    <Route path="*" render={() => <HttpError code={404} />} />
  </Switch>
);
