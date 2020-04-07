import { useRouter } from 'next/router';
import React from 'react';

import { EventPayment } from 'payments/components/EventPayment';

export const EventPaymentPage = () => {
  const router = useRouter();
  const eventId = Number(router.query.eventId);
  return <EventPayment eventId={eventId} />;
};

export default EventPaymentPage;
