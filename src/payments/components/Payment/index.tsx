import React, { FC, useEffect, useState } from 'react';

import { md } from 'common/components/Markdown';
import { Page, Pane } from 'common/components/Panes';
import Spinner from 'common/components/Spinner';
import { StatusMessage } from 'common/components/StatusMessage';

import { getAllRelations } from 'payments/api/paymentRelation';
import { IPayment, IPaymentPrice } from 'payments/models/Payment';
import { IPaymentRelation } from 'payments/models/PaymentRelation';
import { CreatePaymentRelation } from './CreatePaymentRelation';

interface IProps {
  payment: IPayment;
  price: IPaymentPrice;
  showPayment: boolean;
  isPaid?: boolean;
}

export const Payment: FC<IProps> = ({ payment, price, showPayment, isPaid, children }) => {
  const [paymentRelations, setPaymentRelations] = useState<IPaymentRelation[]>();
  const [finished, setFinished] = useState(false);

  const loadPaymentRelations = async () => {
    const relations = await getAllRelations();
    setPaymentRelations(relations);
  };

  useEffect(() => {
    loadPaymentRelations();
  }, []);

  if (!paymentRelations) {
    return <Spinner />;
  }

  const paymentDone = isPaid || finished;

  return (
    <Page>
      <Pane>
        <h2>{payment.description}</h2>
        {paymentDone ? <StatusMessage type="success">Betalingen var vellykket.</StatusMessage> : <>{children}</>}
      </Pane>
      {showPayment && !paymentDone && (
        <Pane>
          <CreatePaymentRelation
            paymentId={payment.id}
            price={price}
            stripeKey={payment.stripe_public_key}
            setFinished={setFinished}
          />
        </Pane>
      )}
    </Page>
  );
};
