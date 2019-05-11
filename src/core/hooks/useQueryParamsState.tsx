import * as H from 'history';
import { DateTime } from 'luxon';

import { EventTypeEnum } from 'events/models/Event';

export const DEFAULT_SEARCH_PARAM = '';
export const DEFAULT_DATE_START_PARAM = DateTime.local().toISODate();
export const DEFAULT_DATE_END_PARAM = DateTime.local()
  .plus({ months: 1 })
  .toISODate();
export const DEFAULT_EVENT_TYPES_PARAM = `[${Object.keys(EventTypeEnum)
  .filter(Number)
  .toString()}]`;

export const useQueryParamsState = (location: H.Location<H.LocationState>) => {
  const params = new URLSearchParams(location.search);
  const search: string = params.get('search') || DEFAULT_SEARCH_PARAM;
  const dateStart: DateTime = DateTime.fromISO(params.get('dateStart') || DEFAULT_DATE_START_PARAM);
  const dateEnd: DateTime = DateTime.fromISO(params.get('dateEnd') || DEFAULT_DATE_END_PARAM);
  const eventTypes: EventTypeEnum[] = JSON.parse(params.get('eventTypes') || DEFAULT_EVENT_TYPES_PARAM);
  const nonAttendanceEventsChecked: boolean =
    params.get('nonAttendanceEvents') === 'true' || params.get('nonAttendanceEvents') === null;

  return {
    search,
    dateStart,
    dateEnd,
    eventTypes,
    nonAttendanceEventsChecked,
  };
};
