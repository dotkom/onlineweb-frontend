import React, { FC } from 'react';

import { Elements, StripeProvider } from 'react-stripe-elements';

import { useStripeInit } from 'payments/hooks/useStripeInit';
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

  const stripe = useStripeInit(stripeKey);

  return (
    <StripeProvider stripe={stripe}>
      <Elements>
        <StripeForm {...rest} />
      </Elements>
    </StripeProvider>
  );
};
