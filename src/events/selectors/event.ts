import { State } from 'core/redux/Store';
import { eventSelectors } from 'events/slices/events';

export const selectEventCapacity = (eventId: number) => (state: State) => {
  const event = eventSelectors.selectById(state, eventId);
  if (!event) {
    return '-';
  } else if (!event.is_attendance_event) {
    return '∞';
  } else {
    return `${event.number_of_seats_taken}/${event.max_capacity}`;
  }
};
