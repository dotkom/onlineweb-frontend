import React, { FC } from 'react';
import { Elements, StripeProvider } from 'react-stripe-elements';

import { STRIPE_KEY_TRIKOM } from 'common/constants/stripe';
import { useStripeInit } from 'payments/hooks/useStripeInit';

import { StripeForm } from './StripeForm';

interface IProps {
  paymentId: number;
  priceId: number;
}

export const CreatePaymentRelation: FC<IProps> = ({ paymentId, priceId }) => {
  const stripe = useStripeInit(STRIPE_KEY_TRIKOM); // TODO: Which key(s) to use?

  return (
    <StripeProvider stripe={stripe}>
      <Elements>
        <StripeForm paymentId={paymentId} priceId={priceId} />
      </Elements>
    </StripeProvider>
  );
};
