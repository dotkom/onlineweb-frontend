import * as H from 'history';
import { DateTime } from 'luxon';
import { EventTypeEnum } from '../../events/models/Event';

export const useQueryParamsState = (location: H.Location<H.LocationState>) => {
  const params = new URLSearchParams(location.search);

  const search: string = params.get('search') || '';
  const dateStart: DateTime = DateTime.fromISO(params.get('dateStart') || DateTime.local().toISODate());
  const dateEnd: DateTime = DateTime.fromISO(
    params.get('dateEnd') ||
      DateTime.local()
        .plus({ months: 1 })
        .toISODate()
  );
  const eventTypes: EventTypeEnum[] = JSON.parse(params.get('eventTypes') || '[1, 2, 3, 4, 5, 6, 7, 8]');

  return {
    search,
    dateStart,
    dateEnd,
    eventTypes,
  };
};
