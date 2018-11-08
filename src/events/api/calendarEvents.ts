import { DateTime } from 'luxon';
import { controlledGetEvents, getEvents, IEventAPIParameters } from './events';

/**
 * @summary Fetch the events for an entire month.
 * @description Calculate the range this month represents.
 * @param {DateTime} month DateTime set to a month of which to fetch events.
 */
export const getCalendarEventsControlled = (month: DateTime) => {
  /** Calculate the range this month represents */
  const firstDayOfMonth = month.minus({ days: month.day - 1 });
  const lastDayOfMonth = firstDayOfMonth.plus({ months: 1 }).minus({ days: 1 });

  /** Set the query parameters of the fetch to the range, set page size large enough to get all */
  const args: IEventAPIParameters = {
    event_start__gte: firstDayOfMonth.toISODate(),
    event_start__lte: lastDayOfMonth.toISODate(),
    page_size: 60,
  };

  return controlledGetEvents(args);
};

export const getCalendarEvents = async (month: DateTime) => {
  /** Calculate the range this month represents */
  const firstDayOfMonth = month.minus({ days: month.day - 1 });
  const lastDayOfMonth = firstDayOfMonth.plus({ months: 1 }).minus({ days: 1 });

  /** Set the query parameters of the fetch to the range, set page size large enough to get all */
  const args: IEventAPIParameters = {
    event_start__gte: firstDayOfMonth.toISODate(),
    event_start__lte: lastDayOfMonth.toISODate(),
    page_size: 60,
  };

  const events = await getEvents(args);
  return events;
};
