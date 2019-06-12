import { useEffect, useState } from 'react';
import { PaymentRequestEvent, ReactStripeElements } from 'react-stripe-elements';

import { IGenericReturn } from 'payments/api/paymentTransaction';

export type PaymentRequest = stripe.paymentRequest.StripePaymentRequest;

export interface IReturn {
  paymentRequest: PaymentRequest | null;
  canMakePayment: boolean;
  loading: boolean;
}

export const usePaymentRequest = (
  stripe: ReactStripeElements.StripeProps,
  /** Amount in NOK */
  amount: number,
  /** Text describing the Payment */
  label: string,
  /** Function for what happends when the payment is completed */
  onPaymentMethod?: (paymentMethod: {}) => Promise<IGenericReturn['status']>
): IReturn => {
  const [loading, setLoading] = useState(true);
  const [canMakePayment, setCanMakePayment] = useState(false);
  const [paymentRequest, setPaymentRequest] = useState<PaymentRequest | null>(null);

  const createPaymentRequest = () => {
    const request = stripe.paymentRequest({
      country: 'NO',
      currency: 'nok',
      total: {
        label,
        amount: amount * 100, // NOK amount are in 'øre'.
      },
      requestPayerName: true,
      requestPayerEmail: true,
    });
    return request;
  };

  const paymentMethodListener = () => {
    if (paymentRequest) {
      /** Disable provious listener for previous versions of the payment request */
      // @ts-ignore | Outdated types for Stripe.
      paymentRequest.off('paymentmethod');
      /** Add listener for completed payments */
      // @ts-ignore | Outdated types for Stripe.
      paymentRequest.on('paymentmethod', async (event: PaymentRequestEvent) => {
        if (onPaymentMethod) {
          const status = await onPaymentMethod(event.paymentMethod);
          event.complete(status === 'success' ? 'success' : 'fail');
        }
      });
    }
  };

  const resolveCanMakePayment = async () => {
    if (paymentRequest) {
      const canMakePaymentCheck = await paymentRequest.canMakePayment();
      setCanMakePayment(!!canMakePaymentCheck);
      setLoading(false);
    }
  };

  useEffect(() => {
    setPaymentRequest(createPaymentRequest());
  }, [stripe]);

  useEffect(() => {
    resolveCanMakePayment();
    paymentMethodListener();
  }, [paymentRequest]);

  useEffect(() => {
    if (paymentRequest) {
      // @ts-ignore
      paymentRequest.update({
        total: {
          label,
          amount: amount * 100, // NOK amount are in 'øre'.
        },
      });
    }
    /** Listener needs to be re-enabled after changes */
    paymentMethodListener();
  }, [amount, label]);

  return {
    paymentRequest,
    canMakePayment,
    loading,
  };
};
