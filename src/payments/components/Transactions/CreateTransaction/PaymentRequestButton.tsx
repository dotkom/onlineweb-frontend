import React, { FC, useEffect, useState } from 'react';
import { PaymentRequestButtonElement, ReactStripeElements } from 'react-stripe-elements';

export type PaymentRequest = stripe.paymentRequest.StripePaymentRequest;

const STYLE: stripe.elements.ElementsOptions['style'] = {
  paymentRequestButton: {
    type: 'buy',
    theme: 'dark',
    height: '50px',
  },
};

export interface IProps {
  stripe: ReactStripeElements.StripeProps;
  amount: number;
  label: string;
  onPaymentMethod: (paymentMethod: {}) => void;
}

export const PaymentRequestButton: FC<IProps> = ({ stripe, amount, label, onPaymentMethod }) => {
  const [canMakePayment, setCanMakePayment] = useState(false);
  const [paymentRequest, setPaymentRequest] = useState<PaymentRequest | null>(null);

  const createPaymentRequest = (chargeAmount: number) => {
    const request = stripe.paymentRequest({
      country: 'NO',
      currency: 'nok',
      total: {
        label,
        amount: chargeAmount * 100, // NOK amount are in 'øre'.
      },
      requestPayerName: true,
      requestPayerEmail: true,
    });
    return request;
  };

  const paymentMethodListener = () => {
    if (paymentRequest) {
      // @ts-ignore
      paymentRequest.on('paymentmethod', async (paymentMethod) => {
        onPaymentMethod(paymentMethod);
      });
    }
  };

  const resolveCanMakePayment = async () => {
    if (paymentRequest) {
      const canMakePaymentCheck = await paymentRequest.canMakePayment();
      setCanMakePayment(!!canMakePaymentCheck);
    }
  };

  useEffect(() => {
    setPaymentRequest(createPaymentRequest(amount));
  }, [stripe, amount]);

  useEffect(() => {
    resolveCanMakePayment();
  }, [paymentRequest]);

  useEffect(() => {
    paymentMethodListener();
  }, []);

  return (
    <>
      {canMakePayment && paymentRequest ? (
        <PaymentRequestButtonElement paymentRequest={paymentRequest} style={STYLE} placeholderCountry="NO" />
      ) : null}
    </>
  );
};
