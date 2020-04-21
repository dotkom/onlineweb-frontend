import { DateTime, Interval } from 'luxon';

import { IEvent } from 'events/models/Event';

/**
 * Check if an event is ongoing at a spcific time.
 * @param event The event to check.
 * @param time The time to check. Now if not specified.
 * @returns {Boolean} Wether the event is ongoing for the given time.
 */
export const isOngoing = (event: IEvent, time: DateTime = DateTime.local()): boolean => {
  const start = DateTime.fromISO(event.start_date);
  const end = DateTime.fromISO(event.end_date);
  const duration = Interval.fromDateTimes(start, end);
  return duration.contains(time);
};

export const isOngoingOrFuture = (event: IEvent, time: DateTime = DateTime.local()): boolean => {
  const start = DateTime.fromISO(event.start_date);
  return start >= time || isOngoing(event, time);
};

/**
 * Check if an event before a specified date.
 * @param event The event to check.
 * @param endTime The time to check.
 * @returns {Boolean} Whether the event starts before the given time.
 */
export const isBefore = (event: IEvent, endTime: DateTime = DateTime.local()): boolean => {
  const start = DateTime.fromISO(event.start_date);
  const endTimeDateTime = endTime;
  return start <= endTimeDateTime;
};

/**
 * Check if an event starts after a specified date.
 * @param event The event to check.
 * @param startTime The time to check.
 * @returns {Boolean} Whether the event starts after the given time.
 */
export const isAfter = (event: IEvent, startTime: DateTime = DateTime.local()): boolean => {
  const start = DateTime.fromISO(event.start_date);
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
export const isInDateRange = (event: IEvent, startTime: DateTime, endTime: DateTime): boolean => {
  const start = DateTime.fromISO(event.start_date);
  const end = DateTime.fromISO(event.end_date);
  const range = Interval.fromDateTimes(startTime, endTime);
  return range.contains(start) || range.contains(end);
};
