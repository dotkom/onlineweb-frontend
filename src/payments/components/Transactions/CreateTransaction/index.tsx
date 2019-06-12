import React from 'react';
import { Elements, StripeProvider } from 'react-stripe-elements';

import { STRIPE_KEY_TRIKOM } from 'common/constants/stripe';
import { useStripeInit } from 'payments/hooks/useStripeInit';

import { StripeForm } from './StripeForm';

export const CreateTransaction = () => {
  const stripe = useStripeInit(STRIPE_KEY_TRIKOM);

  return (
    <StripeProvider stripe={stripe}>
      <Elements>
        <StripeForm />
      </Elements>
    </StripeProvider>
  );
};
