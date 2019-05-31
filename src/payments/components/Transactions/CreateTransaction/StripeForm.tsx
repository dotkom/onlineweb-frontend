import React, { ChangeEvent, FC, FormEvent, useState } from 'react';
import { CardElement, injectStripe, ReactStripeElements } from 'react-stripe-elements';

import { md } from 'common/components/Markdown';
import { useToast } from 'core/utils/toast/useToast';
import {
  createPaymentMethod,
  createTransaction,
  handleCardVerification,
  IGenericReturn,
} from 'payments/api/paymentTransaction';

import style from './createTransaction.less';

const ABOUT_CREATE_TRANSACTION = md`
## Legg til Saldo
`;

export interface IProps extends ReactStripeElements.InjectedStripeProps {}

const SALDO_VALUES = [100, 200, 500];

export const Form: FC<IProps> = ({ stripe }) => {
  const [displayError] = useToast({ type: 'error', duration: 12000 });
  const [displayMessage] = useToast({ duration: 12000, overwrite: true });
  const [processing, setProcessing] = useState(false);
  const [amount, setAmount] = useState(SALDO_VALUES[0]);

  const handleResponse = ({ status, message }: IGenericReturn) => {
    if (status === 'error') {
      displayError(message);
    } else if (status === 'success' || status === 'pending') {
      displayMessage(message);
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!stripe) {
      displayError('Det skjedde noe galt med koblingen til betalingssystemet.');
      return;
    }
    setProcessing(true);
    const methodResponse = await createPaymentMethod(stripe);

    handleResponse(methodResponse);
    if (methodResponse.status === 'success' && methodResponse.paymentMethod) {
      const transactionResponse = await createTransaction(amount, methodResponse.paymentMethod);
      handleResponse(transactionResponse);
      if (transactionResponse.status === 'pending' && transactionResponse.transaction) {
        const verifyResponse = await handleCardVerification(stripe, transactionResponse.transaction);
        handleResponse(verifyResponse);
      }
    }
    setProcessing(false);
  };

  const onAmountChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setAmount(Number(event.target.value));
  };

  return (
    <div className={style.container}>
      {ABOUT_CREATE_TRANSACTION}
      <form onSubmit={handleSubmit} className={style.form}>
        <CardElement style={{ base: { fontSize: '18px' } }} />
        <div className={style.subForm}>
          <select onChange={onAmountChange} value={amount}>
            {SALDO_VALUES.map((value) => (
              <option value={value} key={value}>{`${value} kr`}</option>
            ))}
          </select>
          <button disabled={processing} className={style.payButton}>
            Betal
          </button>
        </div>
      </form>
    </div>
  );
};

export const StripeForm = injectStripe(Form);
