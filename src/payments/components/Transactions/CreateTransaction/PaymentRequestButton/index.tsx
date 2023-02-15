import React, { FC } from 'react';
import { PaymentRequestButtonElement, ReactStripeElements } from '@stripe/react-stripe-js';

import { IGenericReturn } from 'payments/api/paymentTransaction';
import { usePaymentRequest } from 'payments/hooks/usePaymentRequest';

import { PaymentMethodDescription } from '../PaymentMethodDescription';
import { PlaceholderButton } from './PlaceholderButton';

export type PaymentRequest = stripe.paymentRequest.StripePaymentRequest;

const STYLE: stripe.elements.ElementsOptions['style'] = {
  paymentRequestButton: {
    type: 'buy',
    theme: 'dark',
    height: '44px',
  },
};

export interface IProps {
  stripe: ReactStripeElements.StripeProps;
  amount: number;
  label: string;
  onPaymentMethod: (paymentMethod: {}) => Promise<IGenericReturn['status']>;
}

export const PaymentRequestButton: FC<IProps> = ({ stripe, amount, label, onPaymentMethod }) => {
  const { canMakePayment, paymentRequest, loading } = usePaymentRequest(stripe, amount, label, onPaymentMethod);

  return (
    <div>
      <PaymentMethodDescription>Betal med Google/Apple Pay</PaymentMethodDescription>
      {canMakePayment === true && paymentRequest !== null ? (
        <PaymentRequestButtonElement paymentRequest={paymentRequest} style={STYLE} />
      ) : (
        <PlaceholderButton>{loading ? 'Laster...' : 'Ikke støttet'}</PlaceholderButton>
      )}
    </div>
  );
};
