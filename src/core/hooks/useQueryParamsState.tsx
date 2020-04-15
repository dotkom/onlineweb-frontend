import { DateTime } from 'luxon';

import { __CLIENT__ } from 'common/constants/environment';
import { EventTypeEnum } from 'events/models/Event';

export const DEFAULT_SEARCH_PARAM = '';
export const DEFAULT_DATE_START_PARAM = DateTime.local().toISODate();
export const DEFAULT_DATE_END_PARAM = DateTime.local()
  .plus({ months: 1 })
  .toISODate();
export const DEFAULT_EVENT_TYPES_PARAM = `[${Object.keys(EventTypeEnum)
  .filter(Number)
  .toString()}]`;

const getParamString = () => (__CLIENT__ ? window.location.search : '');

export const useQueryParamsState = () => {
  const params = new URLSearchParams(getParamString());
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
