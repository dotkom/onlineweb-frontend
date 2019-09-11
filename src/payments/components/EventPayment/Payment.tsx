import React, { FC, useEffect, useState } from 'react';

import { Pane } from 'common/components/Panes';
import Spinner from 'common/components/Spinner';

import { IUserAttendee } from 'events/models/Attendee';
import { IPayment } from 'events/models/Event';
import { getAllRelations, getEventUserAttendees } from 'payments/api/paymentRelation';
import { IPaymentRelation } from 'payments/models/PaymentRelation';
import { CreatePaymentRelation } from './CreatePaymentRelation';

import style from './payment.less';

interface IProps {
  eventId: number;
  payment: IPayment;
}

export const Payment: FC<IProps> = ({ payment, eventId }) => {
  const [userAttendees, setUserAttendees] = useState<IUserAttendee[]>();
  const [paymentRelations, setPaymentRelations] = useState<IPaymentRelation[]>();
  const [selectedPrice, setSelectedPrice] = useState<number>();
  const [finished, setFinished] = useState(false);

  const loadPaymentRelations = async () => {
    const relations = await getAllRelations();
    setPaymentRelations(relations);
  };

  const loadUserAttendees = async () => {
    const attendees = await getEventUserAttendees({ event: eventId });
    setUserAttendees(attendees);
  };

  useEffect(() => {
    loadPaymentRelations();
    loadUserAttendees();
  }, []);

  const selectedPriceObject = payment.payment_prices.find((price) => price.id === selectedPrice);

  if (!paymentRelations || !userAttendees) {
    return <Spinner />;
  }

  const manuallyPaid = userAttendees.find((attendee) => attendee.paid);
  const activeRelation = paymentRelations && paymentRelations.find((relation) => !relation.refunded);
  const isPaid = manuallyPaid || activeRelation || finished;

  // TODO: Handle payment finished, possibly redirect.

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
        {isPaid ? (
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
      {!isPaid && selectedPriceObject && (
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
