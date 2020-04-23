import { getUser } from 'authentication/api';
import { get } from 'common/utils/api';
import { IPayment } from 'payments/models/Payment';

const getEventPaymentUrl = (eventId: number) => `/api/v1/event/attendance-event/${eventId}/payment/`;

export const getPaymentForEvent = async (eventId: number) => {
  const user = await getUser();
  const payment = await get<IPayment>(getEventPaymentUrl(eventId), { format: 'json' }, { user });
  return payment;
};
