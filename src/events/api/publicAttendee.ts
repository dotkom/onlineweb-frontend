import { get } from 'common/utils/api';
import { IPublicAttendee } from 'events/models/Attendee';

import { getUser } from 'authentication/api';

const getPublicAttendeesUrl = (eventId: number) => `/api/v1/event/attendance-events/${eventId}/public-attendees/`;
const getPublicUsersOnWaitlistUrl = (eventId: number) =>
  `/api/v1/event/attendance-events/${eventId}/public-on-waitlist/`;

export const getPublicAttendeesForEvent = async (eventId: number) => {
  const user = await getUser();
  const attendees = await get<IPublicAttendee[]>(getPublicAttendeesUrl(eventId), { format: 'json' }, { user });
  return attendees;
};

export const getPublicUsersOnWaitlistForEvent = async (eventId: number) => {
  const user = await getUser();
  const attendees = await get<IPublicAttendee[]>(getPublicUsersOnWaitlistUrl(eventId), { format: 'json' }, { user });
  return attendees;
};
