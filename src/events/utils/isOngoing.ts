import { DateTime, Interval } from 'luxon';

import { INewEvent } from 'events/models/Event';

/**
 * Check if an event is ongoing at a spcific time.
 * @param event The event to check.
 * @param time The time to check. Now if not specified.
 * @returns {Boolean} Wether the event is ongoing for the given time.
 */
export const isOngoing = (event: INewEvent, time: DateTime = DateTime.local()): boolean => {
  const start = DateTime.fromISO(event.event_start);
  const end = DateTime.fromISO(event.event_end);
  const duration = Interval.fromDateTimes(start, end);
  return duration.contains(time);
};

export const isOngoingOrFuture = (event: INewEvent, time: DateTime = DateTime.local()): boolean => {
  const start = DateTime.fromISO(event.event_start);
  return start >= time || isOngoing(event, time);
};
