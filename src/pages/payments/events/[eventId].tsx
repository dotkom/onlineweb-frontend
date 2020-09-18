import { useRouter } from 'next/router';
import React from 'react';

import { EventPayment } from 'payments/components/EventPayment';
import RequiresLogin from 'authentication/providers/RequiresLogin';

export const EventPaymentPage = () => {
  const router = useRouter();
  const eventId = Number(router.query.eventId);

  return (
    <RequiresLogin>
      <EventPayment eventId={eventId} />
    </RequiresLogin>
  );
};

export default EventPaymentPage;
