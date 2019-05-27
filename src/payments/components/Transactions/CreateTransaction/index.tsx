import React from 'react';
import { Elements, StripeProvider } from 'react-stripe-elements';

import { STRIPE_KEY_TRIKOM } from 'common/constants/stripe';
import { StripeForm } from './StripeForm';

export const CreateTransaction = () => {
  return (
    <StripeProvider apiKey={STRIPE_KEY_TRIKOM}>
      <Elements>
        <StripeForm />
      </Elements>
    </StripeProvider>
  );
};
