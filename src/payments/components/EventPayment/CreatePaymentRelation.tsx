import React, { FC } from 'react';

import { Elements, StripeProvider } from 'react-stripe-elements';

import { IPaymentPrice } from 'events/models/Event';
import { useStripeInit } from 'payments/hooks/useStripeInit';
import { StripeForm } from './StripeForm';

interface IProps {
  setFinished: (finished: boolean) => void;
  stripeKey: string;
  paymentId: number;
  price: IPaymentPrice;
}

export const CreatePaymentRelation: FC<IProps> = (props) => {
  const stripe = useStripeInit(props.stripeKey);

  return (
    <StripeProvider stripe={stripe}>
      <Elements>
        <StripeForm {...props} />
      </Elements>
    </StripeProvider>
  );
};
