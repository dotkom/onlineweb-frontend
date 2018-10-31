import { DateTime } from 'luxon';

/**
 * Store selected calendar month in sessionStorage.
 */

const CALENDAR_SESSION_KEY = 'event-calendar-month';

export interface ICalendarSession {
  month: DateTime;
}

export interface ICalendarSessionString {
  month: string;
}

const DEFAULT_SESSION: ICalendarSessionString = {
  month: DateTime.local().toISO(),
};

const serialize = (session: ICalendarSessionString): ICalendarSession => {
  const serialized: ICalendarSession = {
    month: DateTime.fromISO(session.month),
  };
  return serialized;
};

const deserialize = (session: ICalendarSession): ICalendarSessionString => {
  const deserialized: ICalendarSessionString = {
    month: session.month.toISO(),
  };
  return deserialized;
};

export const getCalendarSession = async (): Promise<ICalendarSession> => {
  const session = await window.sessionStorage.getItem(CALENDAR_SESSION_KEY);
  const serializedSession = serialize(session ? JSON.parse(session) : DEFAULT_SESSION);
  return serializedSession;
};

export const saveCalendarSession = async (session: ICalendarSession) => {
  const deserializedSession = deserialize(session);
  const str = JSON.stringify(deserializedSession);
  await window.sessionStorage.setItem(CALENDAR_SESSION_KEY, str);
};
