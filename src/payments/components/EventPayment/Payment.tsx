import { Pane } from 'common/components/Panes';
import { IPayment } from 'events/models/Event';
import React, { ChangeEvent, FC, useState } from 'react';
import { CreatePaymentRelation } from './CreatePaymentRelation';

interface IProps {
  payment: IPayment;
}

export const Payment: FC<IProps> = ({ payment }) => {
  const [selectedPrice, setSelectedPrice] = useState<number>();

  const selectedPriceObject = payment.payment_prices.find((price) => price.id === selectedPrice);

  const handleSelectPrice = (event: ChangeEvent<HTMLInputElement>) => {
    setSelectedPrice(parseInt(event.target.value, 10));
  };

  // TODO: Handle already paid.
  // TODO: Handle payment finished.

  return (
    <Pane>
      <h2>{payment.description}</h2>

      <form>
        {payment.payment_prices.map((price) => (
          <label key={price.id}>
            <input type="radio" value={price.id} checked={price.id === selectedPrice} onChange={handleSelectPrice} />
            {price.description}: {price.price} kr
          </label>
        ))}
      </form>

      {selectedPriceObject && (
        <CreatePaymentRelation
          paymentId={payment.id}
          price={selectedPriceObject}
          stripeKey={payment.stripe_public_key}
        />
      )}
    </Pane>
  );
};
