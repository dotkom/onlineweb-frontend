import { useRouter } from 'next/router';
import React from 'react';

import { PublicAttendees } from 'events/components/DetailView/PublicAttendees';

const PublicAttendeesPage = () => {
  const { query } = useRouter();
  const eventId = Number(query.eventId);
  return <PublicAttendees eventId={eventId} />;
};

export default PublicAttendeesPage;
