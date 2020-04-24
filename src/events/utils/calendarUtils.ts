import { DateTime, Interval } from 'luxon';

export function getFirstDayOfMonth(date: DateTime) {
  return date.startOf('month');
}

export function getLastDayOfMonth(date: DateTime) {
  return date.endOf('month');
}

export function getFirstDayOfWeek(date: DateTime): DateTime {
  return date.startOf('week');
}

export function getLastDayOfWeek(date: DateTime): DateTime {
  return date.endOf('week');
}

export function getStartOfDay(date: DateTime = DateTime.local()) {
  return date.startOf('day');
}

export function getDatesInInterval(start: DateTime, end: DateTime): DateTime[] {
  return Interval.fromDateTimes(start.startOf('day'), end.endOf('day'))
    .splitBy({ days: 1 })
    .map((d) => d.start);
}

/**
 * Get the first day of the week a month starts on.
 */
export function getFirstDayOfWeekForMonth(month: DateTime): DateTime {
  return getFirstDayOfWeek(getFirstDayOfMonth(month));
}

/**
 * Get the last day of the week a month ends on.
 */
export function getLastDayOfWeekForMonth(month: DateTime): DateTime {
  return getLastDayOfWeek(getLastDayOfMonth(month));
}
