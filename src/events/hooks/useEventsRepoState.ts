import { DateTime } from 'luxon';
import { useContext, useEffect, useMemo, useState } from 'react';

import { getCalendarEvents } from 'events/api/calendarEvents';
import { getAllEventsParamtered, getEvent, getEvents, IEventAPIParameters } from 'events/api/events';
import { INewEvent } from 'events/models/Event';
import { useQueryParamsState } from '../../core/hooks/useQueryParamsState';
import { QueryParams } from '../../core/providers/QueryParams';
import { isAfter, isBefore, isInDateRange } from '../utils/eventTimeUtils';

export type EventMap = Map<number, INewEvent>;

const INITIAL_STATE: INewEvent[] = [];

const getFilteredEventList = (searchContext: ReturnType<typeof useQueryParamsState>, eventList: INewEvent[]) => {
  const { search, dateStart, dateEnd, eventTypes } = searchContext;
  let filteringEventList = eventList.filter((event) => eventTypes.includes(event.event_type));

  if (search) {
    const smallSearch = search.toLowerCase();
    filteringEventList = filteringEventList.filter(
      (event: INewEvent) =>
        event.title.toLowerCase().includes(smallSearch) ||
        event.description.toLowerCase().includes(smallSearch) ||
        event.ingress.toLowerCase().includes(smallSearch) ||
        event.location.toLowerCase().includes(smallSearch) ||
        event.organizer_name.toLowerCase().includes(smallSearch)
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
  const searchContext = useContext(QueryParams);

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
    console.log(events);
    updateEventList(events);
  };

  const fetchEventsByMonth = async (month: DateTime) => {
    const events = await getCalendarEvents(month);
    updateEventList(events);
  };

  const filteredEventList = useMemo(() => {
    return getFilteredEventList(searchContext, eventList);
  }, [searchContext, eventList]);

  useEffect(() => {
    fetchQueryEvents();
  }, [searchContext.dateEnd, searchContext.dateStart, searchContext.eventTypes]);

  const fetchQueryEvents = async () => {
    const { dateEnd, dateStart, eventTypes } = searchContext;
    let newEvents: INewEvent[];
    if (!false) {
      newEvents = await getAllEventsParamtered({
        event_start__gte: dateStart.toISODate(),
        event_end__lte: dateEnd.toISODate(),
        event_type: eventTypes,
      });
      updateEventList(newEvents);
    }
  };

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
