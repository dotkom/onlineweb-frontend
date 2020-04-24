import { State } from 'core/redux/Store';
import { publicAttendeeSelectors } from 'events/slices/publicAttendees';

export const selectPublicAttendeesForEventId = (eventId: number) => (state: State) => {
  return publicAttendeeSelectors
    .selectAll(state)
    .filter((attendee) => attendee.event === eventId)
    .sort((attendeeA, attendeeB) => Number(attendeeB.is_visible) - Number(attendeeA.is_visible));
};
