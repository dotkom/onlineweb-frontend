import { EventTypeEnum } from 'events/models/Event';
import { DateTime } from 'luxon';
import { getEvents } from './events';

export const getImageEvents = async () => {
  const left = getTypeEvents([EventTypeEnum.BEDPRES]);
  const middle = getTypeEvents([EventTypeEnum.KURS]);
  const right = getTypeEvents([
    EventTypeEnum.SOSIALT,
    EventTypeEnum.UTFLUKT,
    EventTypeEnum.EKSKURSJON,
    EventTypeEnum.ANNET,
  ]);

  const allEventsList = await Promise.all([left, middle, right]);
  return allEventsList;
};

export const getTypeEvents = async (types: EventTypeEnum[]) => {
  return await getEvents({
    event_end__gte: DateTime.local().toISODate(),
    event_type: types,
    page_size: 4,
  });
};
