import React, { FC, useEffect, useState } from 'react';

import { Page, Pane } from 'common/components/Panes';
import Spinner from 'common/components/Spinner';

import { IPayment, IPaymentPrice } from 'events/models/Event';
import { getAllRelations } from 'payments/api/paymentRelation';
import { IPaymentRelation } from 'payments/models/PaymentRelation';
import { CreatePaymentRelation } from './CreatePaymentRelation';

import { md } from 'common/components/Markdown';

import style from '../Payment/payment.less';

interface IProps {
  payment: IPayment;
  price: IPaymentPrice;
  showPayment: boolean;
  isPaid?: boolean;
}

const ABOUT_PAYMENT_PAGE = md`
  # Betalingssiden

  Velkommen til en beta-versjon av Onlines nye betalingsside! Dotkom minner om at de nye nettsidene til Online enda er under utvikling, og vi setter pris på all tilbakemelding du kan gi.
`;

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
      <Pane>{ABOUT_PAYMENT_PAGE}</Pane>
      <Pane>
        <h2>{payment.description}</h2>
        {paymentDone ? <div className={style.success}>Betalingen var vellykket.</div> : <>{children}</>}
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
