import React, { FC, useEffect, useState } from 'react';

import { Pane } from 'common/components/Panes';
import Spinner from 'common/components/Spinner';

import { IPayment } from 'events/models/Event';
import { getAllRelations } from 'payments/api/paymentRelation';
import { IPaymentRelation } from 'payments/models/PaymentRelation';
import { CreatePaymentRelation } from './CreatePaymentRelation';

import style from './payment.less';

interface IProps {
  payment: IPayment;
  isPaid?: boolean;
}

export const Payment: FC<IProps> = ({ payment, isPaid }) => {
  const [paymentRelations, setPaymentRelations] = useState<IPaymentRelation[]>();
  const [selectedPrice, setSelectedPrice] = useState<number>();
  const [finished, setFinished] = useState(false);

  const loadPaymentRelations = async () => {
    const relations = await getAllRelations();
    setPaymentRelations(relations);
  };

  useEffect(() => {
    loadPaymentRelations();
    if (payment.payment_prices.length === 1) {
      setSelectedPrice(payment.payment_prices[0].id);
    }
  }, []);

  const selectedPriceObject = payment.payment_prices.find((price) => price.id === selectedPrice);

  if (!paymentRelations) {
    return <Spinner />;
  }

  const paymentDone = isPaid || finished;

  const payments = payment.payment_prices.map((price) => (
    <div key={price.id} onClick={() => setSelectedPrice(price.id)} className={style.price}>
      <input type="radio" value={price.id} checked={price.id === selectedPrice} readOnly />
      <label>
        {price.description}: {price.price} kr
      </label>
    </div>
  ));

  return (
    <>
      <Pane>
        <h2>{payment.description}</h2>

        {paymentDone ? (
          <p>Betalingen var vellykket.</p>
        ) : (
          <div>
            <form>{payments}</form>
            {!selectedPriceObject && (
              <div className={style.infobox}>Velg et alternativ for å gå videre til betaling.</div>
            )}
          </div>
        )}
      </Pane>
      {!paymentDone && selectedPriceObject && (
        <Pane>
          <CreatePaymentRelation
            paymentId={payment.id}
            price={selectedPriceObject}
            stripeKey={payment.stripe_public_key}
            setFinished={setFinished}
          />
        </Pane>
      )}
    </>
  );
};
