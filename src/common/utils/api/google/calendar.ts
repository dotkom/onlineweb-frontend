import { get } from '..';
import { GCAL_KEY } from '../../../constants/google';
import { ICalendarResult } from './models/calendar';

const DOMAIN = 'https://www.googleapis.com';
const API_URL = '/calendar/v3/calendars/';

export interface IGoogleCalendarParams {
  singleEvents?: boolean;
  timeMax?: string;
  timeMin?: string;
}

export interface IGetCalendarParams {
  calendarId: string;
  params: IGoogleCalendarParams;
}

export const getCalendar = async (opts: IGetCalendarParams): Promise<ICalendarResult> => {
  const parameters = { ...opts.params, key: GCAL_KEY };
  const url = `${API_URL}${opts.calendarId}/events`;
  return await get(url, parameters, { domain: DOMAIN });
};
