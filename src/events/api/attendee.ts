import { get } from 'common/utils/api';
import { IAttendee } from 'events/models/Attendee';

import { getUser } from 'authentication/api';

const getEventAttendeeUrl = (eventId: number) => `/api/v1/event/attendance-events/${eventId}/attendee/`;

export const getAttendeeForEvent = async (eventId: number) => {
  const user = await getUser();
  const attendee = await get<IAttendee>(getEventAttendeeUrl(eventId), { format: 'json' }, { user });
  return attendee;
};
