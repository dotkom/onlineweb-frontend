import { DateTime } from 'luxon';
import { useContext, useEffect, useState } from 'react';

import { getCalendarEvents } from 'events/api/calendarEvents';
import { getEvent, getEvents, IEventAPIParameters } from 'events/api/events';
import { INewEvent } from 'events/models/Event';
import { CookieContext } from '../../core/providers/Cookies';
import { isAfter, isBefore, isInDateRange } from '../utils/eventTimeUtils';

export type EventMap = Map<number, INewEvent>;

const INITIAL_STATE: INewEvent[] = [];

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

  const getFilteredEventList = () => {
    const { cookies, dispatch } = useContext(CookieContext);
    let filteringEventList = eventList;

    if (cookies.searchText !== '') {
      filteringEventList = filteringEventList.filter(
        (event: INewEvent) =>
          event.title.includes(cookies.searchText) ||
          event.description.includes(cookies.searchText) ||
          event.ingress.includes(cookies.searchText) ||
          event.location.includes(cookies.searchText) ||
          event.organizer_name.includes(cookies.searchText)
      );
    }
    if (cookies.timeEnd !== undefined && cookies.timeStart !== undefined) {
      filteringEventList = filteringEventList.filter((event: INewEvent) =>
        isInDateRange(event, cookies.timeStart, cookies.timeEnd)
      );
    } else if (cookies.timeStart !== undefined) {
      filteringEventList = filteringEventList.filter((event) => isAfter(event, cookies.timeStart));
    } else if (cookies.timeEnd !== undefined) {
      filteringEventList = filteringEventList.filter((event) => isBefore(event, cookies.timeEnd));
    }
    return filteringEventList;
  };
  const filteredEventList = getFilteredEventList();

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
