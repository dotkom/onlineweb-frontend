import React, { FC, useEffect, useState, useContext } from 'react';

import Spinner from 'common/components/Spinner';
import HttpError from 'core/components/errors/HttpError';
import { useDispatch, useSelector } from 'core/redux/hooks';
import { State } from 'core/redux/Store';
import { attendanceEventSelectors, fetchAttendanceEventById } from 'events/slices/attendanceEvents';
import { attendeeSelectors, fetchAttendeeByEventId } from 'events/slices/attendees';
import { IPaymentPrice } from 'payments/models/Payment';
import { fetchPaymentEventById, paymentSelectors } from 'payments/slices/payments';

import { Payment } from '../Payment';
import style from '../Payment/payment.less';
import { UserContext } from 'authentication/providers/UserProvider';

interface IProps {
  eventId: number;
}

export const EventPayment: FC<IProps> = ({ eventId }) => {
  const [selectedPriceId, setSelectedPriceId] = useState<number>();

  const dispatch = useDispatch();
  const attendanceEvent = useSelector((state) => attendanceEventSelectors.selectById(state, eventId));
  const attendee = useSelector(selectAttendeeByEventId(eventId));
  const payment = useSelector(selectPaymentByEventId(eventId));
  // User has already paid for the event, or otherwise been marked as paid.
  const isPaid = attendee && attendee.has_paid;
  const { user } = useContext(UserContext);

  useEffect(() => {
    dispatch(fetchAttendanceEventById(eventId));
    dispatch(fetchAttendeeByEventId(eventId));
    dispatch(fetchPaymentEventById(eventId));
  }, [eventId]);

  useEffect(() => {
    console.log(payment);
    if (payment && payment.payment_prices.length === 1) {
      setSelectedPriceId(payment.payment_prices[0].id);
      console.log(selectedPriceId);
    }
  }, [payment]);

  if (!user) {
    return <div className={style.infobox}>Venligst login med brukeren din</div>;
  }

  if (!attendanceEvent || !attendee || !payment) {
    return <Spinner />;
  }

  // Map both unattending, non-priced, and 404 to a 404 error page.
  if (!attendanceEvent.is_attendee || attendanceEvent.payment === null) {
    return <HttpError code={404} />;
  }

  const selectedPriceObject: IPaymentPrice | undefined = payment.payment_prices.find(
    (price: IPaymentPrice) => price.id === selectedPriceId
  );

  const payments = payment.payment_prices.map((price: IPaymentPrice) => (
    <div key={price.id} onClick={() => setSelectedPriceId(price.id)} className={style.price}>
      <input type="radio" value={price.id} checked={price.id === selectedPriceId} readOnly />
      <label>
        {price.description}: {price.price} kr
      </label>
    </div>
  ));
  console.log(payment);

  return selectedPriceObject ? (
    <Payment payment={payment} price={selectedPriceObject} isPaid={isPaid} showPayment={Boolean(selectedPriceObject)}>
      <form>{payments}</form>
    </Payment>
  ) : (
    <div className={style.infobox}>Velg et alternativ for å gå videre til betaling.</div>
  );
};

const selectAttendeeByEventId = (eventId: number) => (state: State) => {
  return attendeeSelectors.selectAll(state).find((attendee) => attendee.event === eventId);
};

const selectPaymentByEventId = (eventId: number) => (state: State) => {
  return paymentSelectors
    .selectAll(state)
    .find((payment) => payment.object_id === eventId && payment.content_type === 'events.attendanceevent');
};
