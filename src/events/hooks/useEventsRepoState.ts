import { DateTime } from 'luxon';
import { useContext, useEffect, useMemo, useState } from 'react';

import { getCalendarEvents } from 'events/api/calendarEvents';
import { getEvent, getEvents, IEventAPIParameters } from 'events/api/events';
import { INewEvent } from 'events/models/Event';
import { QueryParams } from '../../core/providers/QueryParams';
import { isAfter, isBefore, isInDateRange } from '../utils/eventTimeUtils';

export type EventMap = Map<number, INewEvent>;

const INITIAL_STATE: INewEvent[] = [];

const getFilteredEventList = (eventList: INewEvent[]) => {
  const { search, dateStart, dateEnd, eventTypes } = useContext(QueryParams);
  let filteringEventList = eventList.filter((event) => event.event_type in eventTypes);

  if (search) {
    filteringEventList = filteringEventList.filter(
      (event: INewEvent) =>
        event.title.includes(search) ||
        event.description.includes(search) ||
        event.ingress.includes(search) ||
        event.location.includes(search) ||
        event.organizer_name.includes(search)
    );
  }

  if (dateEnd && dateStart) {
    filteringEventList = filteringEventList.filter((event: INewEvent) => isInDateRange(event, dateStart, dateEnd));
  } else {
    filteringEventList = dateStart
      ? filteringEventList.filter((event) => isAfter(event, dateStart))
      : filteringEventList;
    filteringEventList = dateEnd ? filteringEventList.filter((event) => isBefore(event, dateEnd)) : filteringEventList;
  }
  return filteringEventList;
};

/**
 * Contains the complete collection of events fetched for use in the application.
 * Aims to have a single source of events, to simplify the structure of state.
 */
export const useEventsRepoState = () => {
  const [eventList, setEventList] = useState(INITIAL_STATE);
  const [eventMap, setEventMap] = useState<EventMap>(new Map());

  /** Sync list of events with the map if the map is updated */
  useEffect(() => {
    const pairs = eventList.map<[number, INewEvent]>((event) => [event.id, event]);
    const newEventMap = new Map(pairs);
    setEventMap(newEventMap);
  }, [eventList]);

  const updateEventList = (events: INewEvent[]) => {
    const oldEvents = eventList.filter((oldEvent) => {
      const newEventIds = events.map((event) => event.id);
      return !newEventIds.includes(oldEvent.id);
    });
    const allEvents = oldEvents.concat(events);
    const sorted = allEvents.sort((a, b) => {
      return Date.parse(a.event_start) - Date.parse(b.event_start);
    });
    setEventList(sorted);
  };

  const fetchEvent = async (id: number) => {
    const event = await getEvent(id);
    updateEventList([event]);
  };

  const fetchEvents = async (params?: IEventAPIParameters) => {
    const events = await getEvents(params);
    updateEventList(events);
  };

  const fetchEventsByMonth = async (month: DateTime) => {
    const events = await getCalendarEvents(month);
    updateEventList(events);
  };

  const filteredEventList = useMemo(() => {
    return getFilteredEventList(eventList);
  }, [eventList]);

  return {
    fetchEvent,
    fetchEvents,
    fetchEventsByMonth,
    eventMap,
    eventList,
    updateEventList,
    filteredEventList,
  };
};
