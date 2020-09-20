import { useSelector } from 'core/redux/hooks';
import { selectPaymentByEventId } from 'payments/components/EventPayment';
import { fetchPaymentEventById } from 'payments/slices/payments';
import React, { FC, useEffect } from 'react';
import { useDispatch } from 'react-redux';
interface IProps {
  eventId: number;
}

const EventPrice: FC<IProps> = ({ eventId }) => {
  const dispatch = useDispatch();
  const payment = useSelector(selectPaymentByEventId(eventId));
  useEffect(() => {
    dispatch(fetchPaymentEventById(eventId));
  }, [eventId]);
  return (
    <>
      {payment?.payment_prices.map((payment) => (
        <p key={payment.id}>{payment.description ? `${payment.description}: ${payment.price}` : payment.price} kr</p>
      ))}
    </>
  );
};

export default EventPrice;
