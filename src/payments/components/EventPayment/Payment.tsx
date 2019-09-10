import { Pane } from 'common/components/Panes';
import { IPayment } from 'events/models/Event';
import React, { FC, useState } from 'react';
import { CreatePaymentRelation } from './CreatePaymentRelation';
import style from './payment.less';

interface IProps {
  payment: IPayment;
}

export const Payment: FC<IProps> = ({ payment }) => {
  const [selectedPrice, setSelectedPrice] = useState<number>();
  const selectedPriceObject = payment.payment_prices.find((price) => price.id === selectedPrice);

  // TODO: Handle already paid.
  // TODO: Handle payment finished.

  return (
    <>
      <Pane>
        <h2>{payment.description}</h2>
        <form>
          {payment.payment_prices.map((price) => (
            <div key={price.id} className={style.price} onClick={() => setSelectedPrice(price.id)}>
              <input type="radio" value={price.id} checked={price.id === selectedPrice} readOnly />
              <label>
                {price.description}: {price.price} kr
              </label>
            </div>
          ))}
        </form>
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
