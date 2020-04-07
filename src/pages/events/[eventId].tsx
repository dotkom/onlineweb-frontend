import { useRouter } from 'next/router';
import React from 'react';

import DetailView from 'events/components/DetailView';

const EventDetailPage = () => {
  const router = useRouter();
  const eventId = Number(router.query.eventId);
  return <DetailView eventId={eventId} />;
};

export default EventDetailPage;
