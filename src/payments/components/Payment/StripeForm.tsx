import React, { FC, useState } from 'react';

import { injectStripe, ReactStripeElements } from '@stripe/react-stripe-js';

import { useToast } from 'core/utils/toast/useToast';

import { createPaymentMethod, createRelation, handleCardVerification } from 'payments/api/paymentRelation';
import { IGenericReturn } from 'payments/api/paymentTransaction';
import { CardPayment } from 'payments/components/Transactions/CreateTransaction/CardPayment';
import transactionStyles from 'payments/components/Transactions/CreateTransaction/createTransaction.less';
import { PaymentRequestButton } from 'payments/components/Transactions/CreateTransaction/PaymentRequestButton';
import { IPaymentPrice } from 'payments/models/Payment';

export interface IProps extends ReactStripeElements.InjectedStripeProps {
  setFinished: (finished: boolean) => void;
  paymentId: number;
  price: IPaymentPrice;
}

export const Form: FC<IProps> = ({ stripe, paymentId, price, setFinished }) => {
  const [displayError] = useToast({ type: 'error', duration: 12000 });
  const [displayMessage] = useToast({ duration: 12000, overwrite: true });
  const [processing, setProcessing] = useState(false);

  // Handle payment statuses and display messages appropriately to the user.
  const handleResponse = ({ status, message }: IGenericReturn) => {
    if (status === 'error') {
      displayError(message);
    } else if (status === 'success' || status === 'pending') {
      displayMessage(message);
    }
  };

  /**
   * Handle creation of a payment method. Send payment data to the server.
   * Used by Card payments and Payment Request payments.
   */
  const handlePaymentMethod = async (paymentMethod: {}): Promise<IGenericReturn['status']> => {
    if (stripe) {
      const response = await createRelation(paymentId, price.id, paymentMethod);
      handleResponse(response);
      if (response.status === 'pending' && response.relation) {
        const verifyResponse = await handleCardVerification(stripe, response.relation);
        handleResponse(verifyResponse);
        return verifyResponse.status;
      } else {
        return response.status;
      }
    }
    return 'error';
  };

  // Handle submit from the CardPayment Form.
  const handleSubmit = async () => {
    if (!stripe) {
      displayError('Det skjedde noe galt med koblingen til betalingssystemet.');
      return;
    }

    setProcessing(true);
    const methodResponse = await createPaymentMethod(stripe);
    handleResponse(methodResponse);
    if (methodResponse.status === 'success' && methodResponse.paymentMethod) {
      const status = await handlePaymentMethod(methodResponse.paymentMethod);
      if (status === 'success') {
        setFinished(true);
      }
    }
    setProcessing(false);
  };

  return (
    <div className={transactionStyles.paymentMethods}>
      <CardPayment onSubmit={handleSubmit} processing={processing} />
      <div className={transactionStyles.paymentsDivider} />
      {stripe && (
        <PaymentRequestButton
          stripe={stripe}
          amount={price.price}
          label="Betal"
          onPaymentMethod={handlePaymentMethod}
        />
      )}
    </div>
  );
};

export const StripeForm = injectStripe(Form);
