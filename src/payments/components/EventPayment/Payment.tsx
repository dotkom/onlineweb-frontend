import React, { FC, useEffect, useState } from 'react';

import { Pane } from 'common/components/Panes';
import Spinner from 'common/components/Spinner';

import { IPayment } from 'events/models/Event';
import { getAllRelations } from 'payments/api/paymentRelation';
import { IPaymentRelation } from 'payments/models/PaymentRelation';
import { CreatePaymentRelation } from './CreatePaymentRelation';

interface IProps {
  payment: IPayment;
}

export const Payment: FC<IProps> = ({ payment }) => {
  const [paymentRelations, setPaymentRelations] = useState<IPaymentRelation[]>();
  const [selectedPrice, setSelectedPrice] = useState<number>();

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

  const isPaid = paymentRelations && paymentRelations.find((relation) => !relation.refunded);

  // TODO: Handle payment finished, possibly redirect.

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
        {isPaid ? <p>Du har allerede betalt.</p> : <form>{payments}</form>}
      </Pane>
      {selectedPriceObject && (
        <CreatePaymentRelation
          paymentId={payment.id}
          price={selectedPriceObject}
          stripeKey={payment.stripe_public_key}
        />
      )}
    </>
  );
};
