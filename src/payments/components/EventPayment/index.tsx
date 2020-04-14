import React, { FC, useEffect, useState } from 'react';

import Spinner from 'common/components/Spinner';
import HttpError from 'core/components/errors/HttpError';

import { getAttendanceEvent } from 'events/api/events';
import { IUserAttendee } from 'events/models/Attendee';
import { IAttendanceEvent } from 'events/models/Event';
import { getEventUserAttendees } from 'payments/api/paymentRelation';
import { IPaymentPrice } from 'payments/models/Payment';
import { Payment } from '../Payment';
import style from '../Payment/payment.less';

interface IProps {
  eventId: number;
}

export const EventPayment: FC<IProps> = ({ eventId }) => {
  const [userAttendees, setUserAttendees] = useState<IUserAttendee[]>();
  const [selectedPrice, setSelectedPrice] = useState<number>();

  const [attendanceEvent, setAttendanceEvent] = useState<IAttendanceEvent>();

  const loadAttendanceEvent = async () => {
    const event = await getAttendanceEvent(eventId);
    setAttendanceEvent(event);

    // Automatically select first payment if only one exists.
    if (event.payments.length > 0 && event.payments[0].payment_prices.length === 1) {
      setSelectedPrice(event.payments[0].payment_prices[0].id);
    }
  };

  const loadUserAttendees = async () => {
    const attendees = await getEventUserAttendees({ event: eventId });
    setUserAttendees(attendees);
  };

  useEffect(() => {
    loadAttendanceEvent();
    loadUserAttendees();
  }, []);

  if (!attendanceEvent || !userAttendees) {
    return <Spinner />;
  }

  // Map both unattending, non-priced, and 404 to a 404 error page.
  if (!attendanceEvent.is_attendee || attendanceEvent.payments.length === 0) {
    return <HttpError code={404} />;
  }

  // User has already paid for the event, or otherwise been marked as paid.
  const isPaid = !!userAttendees.find((attendee) => attendee.has_paid);

  const payment = attendanceEvent.payments[0];

  const selectedPriceObject: IPaymentPrice | undefined = payment.payment_prices.find(
    (price: IPaymentPrice) => price.id === selectedPrice
  );

  const payments = payment.payment_prices.map((price: IPaymentPrice) => (
    <div key={price.id} onClick={() => setSelectedPrice(price.id)} className={style.price}>
      <input type="radio" value={price.id} checked={price.id === selectedPrice} readOnly />
      <label>
        {price.description}: {price.price} kr
      </label>
    </div>
  ));

  return selectedPriceObject ? (
    <Payment payment={payment} price={selectedPriceObject} isPaid={isPaid} showPayment={Boolean(selectedPriceObject)}>
      <form>{payments}</form>
    </Payment>
  ) : (
    <div className={style.infobox}>Velg et alternativ for å gå videre til betaling.</div>
  );
};
