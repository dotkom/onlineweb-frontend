import React, { FC, useEffect, useState } from 'react';

import { Pane } from 'common/components/Panes';
import Spinner from 'common/components/Spinner';

import { IPayment } from 'events/models/Event';
import { getAllRelations } from 'payments/api/paymentRelation';
import { IPaymentRelation } from 'payments/models/PaymentRelation';
import { CreatePaymentRelation } from './CreatePaymentRelation';

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
  }, []);

  const selectedPriceObject = payment.payment_prices.find((price) => price.id === selectedPrice);

  if (!paymentRelations) {
    return <Spinner />;
  }

  const paymentDone = isPaid || finished;

  const payments = payment.payment_prices.map((price) => (
    <div key={price.id} onClick={() => setSelectedPrice(price.id)}>
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
          <>
            <form>{payments}</form>

            {selectedPriceObject && (
              <CreatePaymentRelation
                paymentId={payment.id}
                price={selectedPriceObject}
                stripeKey={payment.stripe_public_key}
                setFinished={setFinished}
              />
            )}
          </>
        )}
      </Pane>
    </>
  );
};
