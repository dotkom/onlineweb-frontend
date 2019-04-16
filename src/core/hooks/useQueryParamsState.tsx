import * as H from 'history';
import { DateTime } from 'luxon';
import { EventTypeEnum } from '../../events/models/Event';

export const DEFAULTSEARCHPARAM = '';
export const DEFAULTDATESTARTPARAM = DateTime.local().toISODate();
export const DEFAULTDATEENDPARAM = DateTime.local()
  .plus({ months: 1 })
  .toISODate();
export const DEFAULTEVENTTYPESPARAM = `[${Object.keys(EventTypeEnum)
  .filter(Number)
  .toString()}]`;

export const useQueryParamsState = (location: H.Location<H.LocationState>) => {
  const params = new URLSearchParams(location.search);
  const search: string = params.get('search') || DEFAULTSEARCHPARAM;
  const dateStart: DateTime = DateTime.fromISO(params.get('dateStart') || DEFAULTDATESTARTPARAM);
  const dateEnd: DateTime = DateTime.fromISO(params.get('dateEnd') || DEFAULTDATEENDPARAM);
  const eventTypes: EventTypeEnum[] = JSON.parse(params.get('eventTypes') || DEFAULTEVENTTYPESPARAM);
  const attendanceEventsChecked: boolean = params.get('attendanceEvents') === 'true';

  return {
    search,
    dateStart,
    dateEnd,
    eventTypes,
    attendanceEventsChecked,
  };
};
