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

/**
 * Returns the weekday of the first day of a month from a date object.
 * @param {DateTime} date A Luxon DateTime object.
 * @returns {number} Zero indexed number between 0 and 6.
 */
export function getFirstWeekdayOfMonth(date: DateTime) {
  /** Set the DateTime to the first day of the month */
  const firstDay = getFirstDayOfMonth(date);
  /** Get index of first day from DateTime, zero-index and return */
  return firstDay.weekday - 1;
}

/**
 * @param {DateTime} date Luxon DateTime object.
 * @returns {number} Length of the given month. Number between 28 and 31.
 */
export function getMonthLength(date: DateTime) {
  return date.daysInMonth;
}

/**
 * @param {DateTime} date Luxon DateTime object.
 * @returns {number} Length of the month previous to the given month. Number between 28 and 31.
 */
export function getPreviousMonthLength(date: DateTime) {
  const prev = date.minus({ months: 1 });
  return getMonthLength(prev);
}

/**
 * Shift a Date object with a given number of months.
 * @param {DateTime} date JavaScript Date object to be shifted.
 * @param {number} amount The amount of which to shift the month of the Date object.
 */
export function changeMonth(date: DateTime, amount: number): DateTime {
  if (amount > 0) {
    return date.plus({ months: amount });
  } else if (amount < 0) {
    return date.minus({ months: Math.abs(amount) });
  } else {
    return date;
  }
}

/**
 * Formats a Date object to a nice formatting, e.g. 'April 2020'.
 * @param {Date} date JavaScript Date object.
 * @returns {string} Formated datestring.
 */
export function getMonthAndYear(date: Date) {
  const dt = DateTime.fromJSDate(date);
  return dt.toFormat('MMMM yyyy');
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
