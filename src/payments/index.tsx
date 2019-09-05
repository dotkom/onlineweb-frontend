import HttpError from 'core/components/errors/HttpError';
import { PricePayment } from 'payments/components/PricePayment';
import { Wallet } from 'payments/components/Wallet';
import React, { FC } from 'react';
import { Route, Switch } from 'react-router';

const BASE_ROUTE = '/payments';

export const routes = {
  relation: BASE_ROUTE + '/:payment/:price',
  wallet: BASE_ROUTE + '/wallet',
};

export const PaymentsRouter: FC = () => (
  <Switch>
    <Route exact path={routes.wallet} component={Wallet} />
    <Route exact path={routes.relation} render={({ match }) => <PricePayment paymentId={match.params.id} priceId={match.params.price} />} />
    <Route path="*" render={() => <HttpError code={404} />} />
  </Switch>
);
