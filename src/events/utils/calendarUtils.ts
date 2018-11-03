import { DateTime } from 'luxon';
import { INewEvent } from '../models/Event';

/**
 * Returns the weekday of the first day of a month from a date object.
 * @param {Date} date A JavaScript Date object.
 * @returns {number} Zero indexed number between 0 and 6.
 */
export function getFirstWeekdayOfMonth(date: Date) {
  /** Create DateTime from the date object */
  let dt = DateTime.fromJSDate(date);
  /** Set the DateTime to the first day of the month */
  dt = dt.minus({ days: dt.day - 1 });
  /** Get index of first day from DateTime, zero-index and return */
  return dt.weekday - 1;
}

/**
 * @param {Date} date JavaScript Date object.
 * @returns {number} Length of the given month. Number between 28 and 31.
 */
export function getMonthLength(date: Date) {
  const dt = DateTime.fromJSDate(date);
  return dt.daysInMonth;
}

/**
 * @param {Date} date JavaScript Date object.
 * @returns {number} Length of the month previous to the given month. Number between 28 and 31.
 */
export function getPreviousMonthLength(date: Date) {
  let dt = DateTime.fromJSDate(date);
  dt = dt.minus({ months: 1 });
  return getMonthLength(dt.toJSDate());
}

/**
 * Shift a Date object with a given number of months.
 * @param {Date} date JavaScript Date object to be shifted.
 * @param {number} amount The amount of which to shift the month of the Date object.
 * @returns {Date} Shifted Date object.
 */
export function changeMonth(date: Date, amount: number) {
  let dt = DateTime.fromJSDate(date);
  if (amount > 0) {
    dt = dt.plus({ months: amount });
  } else if (amount < 0) {
    dt = dt.minus({ months: Math.abs(amount) });
  }
  return dt.toJSDate();
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

/**
 * @summary Create the correct representation of the current month.
 * @description To easily display the events of the given month,
 * the month is represented as an Array of Arrays of Events.
 * The outer Array represents the ((day of the month) - 1) the event is on,
 * while the inner Array represents the events on that day.
 * @param {DateTime} month Current month.
 * @param {INewEvent[]} events Events to inject into the month model.
 * @returns {INewEvent[][]} Events represented in a month model.
 */
export const constructMonthMap = (month: DateTime, events: INewEvent[]): INewEvent[][]  => {
  /**
   * @summary Create an empty EventMonth.
   * @description Create an array of length `daysInMonth`, containing empty arrays.
   */
  const map = [...Array(month.daysInMonth)].map((a) => Array(0).fill([]));
  events.forEach((event) => {
    const day = DateTime.fromISO(event.event_start).day - 1;
    map[day].push(event);
  });
  return map;
};
