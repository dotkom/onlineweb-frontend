import * as H from 'history';
import { DateTime } from 'luxon';
import { EventTypeEnum } from '../../events/models/Event';

export const defaultSearchParam = '';
export const defaultDateStartParam = DateTime.local().toISODate();
export const defaultDateEndParam = DateTime.local()
  .plus({ months: 1 })
  .toISODate();
export const defaultEventTypesParam = `[${Object.keys(EventTypeEnum)
  .filter(Number)
  .toString()}]`;

export const useQueryParamsState = (location: H.Location<H.LocationState>) => {
  const params = new URLSearchParams(location.search);
  const search: string = params.get('search') || defaultSearchParam;
  const dateStart: DateTime = DateTime.fromISO(params.get('dateStart') || defaultDateStartParam);
  const dateEnd: DateTime = DateTime.fromISO(params.get('dateEnd') || defaultDateEndParam);
  const eventTypes: EventTypeEnum[] = JSON.parse(params.get('eventTypes') || defaultEventTypesParam);
  const attendanceEventsChecked: boolean = params.get('attendanceEvents') === 'true';

  return {
    search,
    dateStart,
    dateEnd,
    eventTypes,
    attendanceEventsChecked,
  };
};
