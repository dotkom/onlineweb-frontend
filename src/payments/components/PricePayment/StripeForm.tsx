import React, { FC } from 'react';
import transactionStyles from 'payments/components/Transactions/CreateTransaction/createTransaction.less';
import { CardPayment } from 'payments/components/Transactions/CreateTransaction/CardPayment';
import { PaymentRequestButton } from 'payments/components/Transactions/CreateTransaction/PaymentRequestButton';
import { injectStripe, ReactStripeElements } from 'react-stripe-elements';

export interface IProps extends ReactStripeElements.InjectedStripeProps {}

export const Form: FC<IProps> = ({ stripe }) => {
  const amount = 0;
  const processing = false;

  const handleSubmit = (): any => {};
  const handlePaymentMethod = (): any => {};


return (
    <div className={transactionStyles.container}>
      <div className={transactionStyles.paymentMethods}>
        <CardPayment onSubmit={handleSubmit} processing={processing} />
        <div className={transactionStyles.paymentsDivider} />
        {stripe && (
          <PaymentRequestButton
            stripe={stripe}
            amount={amount}
            label="Saldoinnskudd"
            onPaymentMethod={handlePaymentMethod}
          />
        )}
      </div>
    </div>
  );
};

export const StripeForm = injectStripe(Form);
