import React, { FC, useContext, useState } from 'react';
import { injectStripe, ReactStripeElements } from 'react-stripe-elements';

import { md } from 'common/components/Markdown';
import { useThunk } from 'core/redux/hooks';
import { useToast } from 'core/utils/toast/useToast';
import {
  createPaymentMethod,
  createTransaction,
  handleCardVerification,
  IGenericReturn,
} from 'payments/api/paymentTransaction';
import { fetchTransactions } from 'payments/reducers/transactions';

import { CardPayment } from './CardPayment';
import style from './createTransaction.less';
import { PaymentRequestButton } from './PaymentRequestButton';
import { DEFAULT_SALDO_VALUE, SaldoSelect } from './SaldoSelect';

const ABOUT_CREATE_TRANSACTION = md`
## Legg til Saldo
`;

export interface IProps extends ReactStripeElements.InjectedStripeProps {}

export const Form: FC<IProps> = ({ stripe }) => {
  const [displayError] = useToast({ type: 'error', duration: 12000 });
  const [displayMessage] = useToast({ duration: 12000, overwrite: true });
  const [processing, setProcessing] = useState(false);
  const [amount, setAmount] = useState(DEFAULT_SALDO_VALUE);
  const updateTransactions = useThunk(fetchTransactions());
  const { refetch, user } = useContext(UserProfileContext);

  const USER_BALANCE = md`
  # Saldo: ${String(!!user ? user.saldo : 0)} kr
  `;

  /** Handle payment statuses and display messages apropriatly to the user. */
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
      const transactionResponse = await createTransaction(amount, paymentMethod);
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

  /** Handle submit from the CardPayment Form */
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
    updateTransactions();
    refetch();
  };

  return (
    <div className={style.container}>
      {ABOUT_CREATE_TRANSACTION}
      <div className={style.balanceDisplay}>
        <SaldoSelect onChange={setAmount} selected={amount} />
        {USER_BALANCE}
      </div>
      <div className={style.paymentMethods}>
        <CardPayment onSubmit={handleSubmit} processing={processing} />
        <div className={style.paymentsDivider} />
        {stripe ? (
          <PaymentRequestButton
            stripe={stripe}
            amount={amount}
            label="Saldoinnskudd"
            onPaymentMethod={handlePaymentMethod}
          />
        ) : null}
      </div>
    </div>
  );
};

export const StripeForm = injectStripe(Form);
