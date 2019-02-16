import { DateTime } from 'luxon';
import { getEvents } from './events';

export const getListEvents = async () => {
  return await getEvents({
    event_end__gte: DateTime.local().toISODate(),
    page_size: 10,
  });
};
