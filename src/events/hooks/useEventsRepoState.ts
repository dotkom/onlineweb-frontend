import { DateTime } from 'luxon';
import { useContext, useEffect, useMemo, useRef, useState } from 'react';

import { QueryParams } from 'core/providers/QueryParams';
import { getCalendarEvents } from 'events/api/calendarEvents';
import { getAllEvents, getEvent, getEvents, IEventAPIParameters } from 'events/api/events';
import { EventTypeEnum, INewEvent } from 'events/models/Event';
import { EventsRepo } from 'events/providers/EventsRepo';
import { isAfter, isBefore, isInDateRange } from '../utils/eventTimeUtils';

export type EventMap = Map<number, INewEvent>;

const INITIAL_STATE: INewEvent[] = [];

const getTextFiltered = (search: string, eventList: INewEvent[]) =>
  eventList.filter(
    (event: INewEvent) =>
      event.title.toLowerCase().includes(search) ||
      event.description.toLowerCase().includes(search) ||
      event.ingress.toLowerCase().includes(search) ||
      event.location.toLowerCase().includes(search) ||
      event.organizer_name.toLowerCase().includes(search)
  );

const getEventTypeFiltered = (eventTypes: EventTypeEnum[], eventList: INewEvent[]) =>
  eventList.filter((event) => eventTypes.includes(event.event_type));

const getDateFiltered = (dateStart: DateTime, dateEnd: DateTime, eventList: INewEvent[]) =>
  dateEnd && dateStart
    ? eventList.filter((event) => isInDateRange(event, dateStart, dateEnd))
    : dateStart
    ? eventList.filter((event) => isAfter(event, dateStart))
    : dateEnd
    ? eventList.filter((event) => isBefore(event, dateEnd))
    : eventList;

const getAttendanceEventFiltered = (attendanceEventsChecked: boolean, eventList: INewEvent[]) =>
  !attendanceEventsChecked ? eventList.filter((event) => event.attendance_event) : eventList;

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

  return {
    fetchEvent,
    fetchEvents,
    fetchEventsByMonth,
    eventMap,
    eventList,
    updateEventList,
  };
};

const useFilteredEventList = () => {
  const { eventList, updateEventList } = useContext(EventsRepo);
  const searchContext = useContext(QueryParams);
  const { search, dateStart, dateEnd, eventTypes, nonAttendanceEventsChecked } = searchContext;
  const highestDate = useRef(dateEnd.minus(1));
  const lowestDate = useRef(dateStart.plus(1));

  const fetchQueryEvents = async (paramChanged: fetchEventParam) => {
    let options = {};
    switch (paramChanged) {
      case fetchEventParam.DATESTART:
        if (dateStart < lowestDate.current) {
          options = { event_start__gte: dateStart.toISODate(), event_end__lte: lowestDate.current.toISODate() };
          lowestDate.current = dateStart;
        }
        break;
      case fetchEventParam.DATEEND:
        if (dateEnd > highestDate.current) {
          options = { event_start__gte: highestDate.current.toISODate(), event_end__lte: dateEnd.toISODate() };
          highestDate.current = dateEnd;
        }
        break;
      case fetchEventParam.INIT:
        options = { event_start__gte: dateStart.toISODate(), event_end__lte: dateEnd.toISODate() };
    }
    if (Object.keys(options).length !== 0) {
      const newEvents = await getAllEvents(options);
      updateEventList(newEvents);
    }
  };

  const eventListAttendanceEventFiltered = useMemo(
    () => getAttendanceEventFiltered(nonAttendanceEventsChecked, eventList),
    [nonAttendanceEventsChecked, eventList.toString()]
  );

  const eventListEventTypeFiltered = useMemo(() => getEventTypeFiltered(eventTypes, eventListAttendanceEventFiltered), [
    eventTypes.toString(),
    eventListAttendanceEventFiltered,
  ]);

  const eventListDateFiltered = useMemo(() => getDateFiltered(dateStart, dateEnd, eventListEventTypeFiltered), [
    dateStart.toISODate(),
    dateEnd.toISODate(),
    eventListEventTypeFiltered,
  ]);

  const eventListFinal = useMemo(() => getTextFiltered(search.toLowerCase(), eventListDateFiltered), [
    search.toLowerCase(),
    eventListDateFiltered,
  ]);
  const [filteredEvents, setFilteredEvents] = useState(eventListFinal);

  useEffect(() => {
    setFilteredEvents(eventListFinal);
  }, [search, nonAttendanceEventsChecked, eventTypes.toString()]);

  useEffect(() => {
    const changedDate =
      dateStart !== lowestDate.current && dateEnd !== highestDate.current
        ? fetchEventParam.INIT
        : dateEnd !== highestDate.current
        ? fetchEventParam.DATEEND
        : fetchEventParam.DATESTART;
    fetchQueryEvents(changedDate).then(() => setFilteredEvents(eventListFinal));
  }, [dateEnd.toISODate(), dateStart.toISODate()]);

  return filteredEvents;
};

enum fetchEventParam {
  DATESTART,
  DATEEND,
  INIT,
}

const useDebounce = (value: INewEvent[], delay: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    return () => {
      clearTimeout(handler);
    };
  }, [value]);

  return debouncedValue;
};

export const useDebouncedFilteredEventList = () => useDebounce(useFilteredEventList(), 50);
