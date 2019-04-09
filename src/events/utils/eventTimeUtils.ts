import { DateTime, Interval } from 'luxon';

import { INewEvent } from 'events/models/Event';

/**
 * Check if an event is ongoing at a spcific time.
 * @param event The event to check.
 * @param time The time to check. Now if not specified.
 * @returns {Boolean} Whether the event is ongoing for the given time.
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

/**
 * Check if an event before a specified date.
 * @param event The event to check.
 * @param endTime The time to check.
 * @returns {Boolean} Whether the event starts before the given time.
 */
export const isBefore = (event: INewEvent, endTime: DateTime = DateTime.local()): boolean => {
  const start = DateTime.fromISO(event.event_start);
  const endTimeDateTime = endTime;
  return start <= endTimeDateTime;
};

/**
 * Check if an event starts after a specified date.
 * @param event The event to check.
 * @param startTime The time to check.
 * @returns {Boolean} Whether the event starts after the given time.
 */
export const isAfter = (event: INewEvent, startTime: DateTime = DateTime.local()): boolean => {
  const start = DateTime.fromISO(event.event_start);
  const startTimeDateTime = startTime;
  return start >= startTimeDateTime;
};

/**
 * Check if an event is in a specified interval
 * @param event The event to check.
 * @param startTime The start of the interval.
 * @param endTime The end of the interval.
 * @returns {Boolean} Whether the event start or end is within the interval.
 */
export const isInDateRange = (event: INewEvent, startTime: DateTime, endTime: DateTime): boolean => {
  const start = DateTime.fromISO(event.event_start);
  const end = DateTime.fromISO(event.event_end);
  const range = Interval.fromDateTimes(startTime, endTime);
  return range.contains(start) || range.contains(end);
};
