import React, { FC } from 'react';

import { Elements } from '@stripe/react-stripe-js';

import { loadStripe } from '@stripe/stripe-js';
import { IPaymentPrice } from 'payments/models/Payment';
import { StripeForm } from './StripeForm';

interface IProps {
  setFinished: (finished: boolean) => void;
  stripeKey: string;
  paymentId: number;
  price: IPaymentPrice;
}

export const CreatePaymentRelation: FC<IProps> = (props) => {
  const { stripeKey, ...rest } = props;

  const stripePromise = loadStripe(stripeKey);

  return (
    <Elements stripe={stripePromise}>
      <StripeForm {...rest} />
    </Elements>
  );
};
