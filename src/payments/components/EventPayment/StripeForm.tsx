import React, { FC, useState } from 'react';

import { injectStripe, ReactStripeElements } from 'react-stripe-elements';

import { useToast } from 'core/utils/toast/useToast';

import { IPaymentPrice } from 'events/models/Event';
import { createPaymentMethod, createTransaction, handleCardVerification } from 'payments/api/paymentRelation';
import { IGenericReturn } from 'payments/api/paymentTransaction';
import { CardPayment } from 'payments/components/Transactions/CreateTransaction/CardPayment';
import transactionStyles from 'payments/components/Transactions/CreateTransaction/createTransaction.less';
import { PaymentRequestButton } from 'payments/components/Transactions/CreateTransaction/PaymentRequestButton';

export interface IProps extends ReactStripeElements.InjectedStripeProps {
  setFinished: (finished: boolean) => void;
  paymentId: number;
  price: IPaymentPrice;
}

export const Form: FC<IProps> = ({ stripe, paymentId, price, setFinished }) => {
  const [displayError] = useToast({ type: 'error', duration: 12000 });
  const [displayMessage] = useToast({ duration: 12000, overwrite: true });
  const [processing, setProcessing] = useState(false);

  // Handle payment statuses and display messages apropriatly to the user.
  const handleResponse = ({ status, message }: IGenericReturn) => {
    if (status === 'error') {
      displayError(message);
    } else if (status === 'success' || status === 'pending') {
      displayMessage(message);
      if (status === 'success') {
        setFinished(true);
      }
    }
  };

  /**
   * Handle creation of a payment method. Send payment data to the server.
   * Used by Card payments and Payment Request payments.
   */
  const handlePaymentMethod = async (paymentMethod: {}): Promise<IGenericReturn['status']> => {
    if (stripe) {
      const transactionResponse = await createTransaction(paymentId, price.id, paymentMethod);
      handleResponse(transactionResponse);
      if (transactionResponse.status === 'pending' && transactionResponse.transaction) {
        const verifyResponse = await handleCardVerification(stripe, transactionResponse.transaction);
        handleResponse(verifyResponse);
        return verifyResponse.status;
      } else {
        return transactionResponse.status;
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
      handlePaymentMethod(methodResponse.paymentMethod);
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
