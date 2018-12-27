import { getCalendar, IGetCalendarParams, IGoogleCalendarParams } from 'common/utils/api/google/calendar';
import { ICalendarResult } from 'common/utils/api/google/models/calendar';

const OFFICE_SCHEDULE_ID = '54v6g4v6r46qi4asf7lh5j9pcs@group.calendar.google.com';
const OFFICE_ATTENDANTS_SCHEDULE_ID = '';

/**
 * @protected Can only be used on the back-end.
 */
export const getOfficeSchedule = async (params: IGoogleCalendarParams): Promise<ICalendarResult> => {
  const opts: IGetCalendarParams = { calendarId: OFFICE_SCHEDULE_ID, params };
  const calendar = await getCalendar(opts);
  return calendar;
};

/**
 * @protected Can only be used on the back-end.
 */
export const getOfficeAttendants = async (params: IGoogleCalendarParams): Promise<ICalendarResult> => {
  const opts: IGetCalendarParams = { calendarId: OFFICE_ATTENDANTS_SCHEDULE_ID, params };
  const calendar = await getCalendar(opts);
  return calendar;
};
