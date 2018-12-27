import { get } from 'common/utils/api';
import { IGoogleCalendarParams } from 'common/utils/api/google/calendar';
import { ICalendarResult } from 'common/utils/api/google/models/calendar';
import { BASE_ROUTE, routes } from 'office/backend/routes';

const API_URL = BASE_ROUTE + routes.schedule;

export const getOfficeSchedule = async (params: IGoogleCalendarParams): Promise<ICalendarResult> => {
  const results: ICalendarResult = await get(API_URL, params, { domain: window.location.origin });
  return results;
};
