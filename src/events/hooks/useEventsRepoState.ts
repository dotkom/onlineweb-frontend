import { DateTime } from 'luxon';
import { useContext, useEffect, useMemo, useState } from 'react';

// import { useQueryParamsState } from 'core/hooks/useQueryParamsState';
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

/*const getFilteredEventList = (searchContext: ReturnType<typeof useQueryParamsState>, eventList: INewEvent[]) => {
  const t0 = performance.now();

  const { search, dateStart, dateEnd, eventTypes, attendanceEventsChecked } = searchContext;

  const eventListAttendanceEventFiltered = useMemo(
    () => getAttendanceEventFiltered(attendanceEventsChecked, eventList),
    [attendanceEventsChecked, eventList]
  );

  const eventListEventTypeFiltered = useMemo(() => getEventTypeFiltered(eventTypes, eventListAttendanceEventFiltered), [
    eventTypes,
    eventListAttendanceEventFiltered,
  ]);

  const eventListDateFiltered = useMemo(() => getDateFiltered(dateStart, dateEnd, eventListEventTypeFiltered), [
    dateStart,
    dateEnd,
    eventListEventTypeFiltered,
  ]);

  const eventListFinal = useMemo(() => getTextFiltered(search.toLowerCase(), eventListDateFiltered), [
    search.toLowerCase(),
    eventListDateFiltered,
  ]);

  const t1 = performance.now();
  console.log('Call to getFilteredEventList took ' + (t1 - t0) + ' milliseconds.');
  return eventListFinal;
};*/

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

export const useFilteredEventList = () => {
  const searchContext = useContext(QueryParams);
  const { eventList, updateEventList } = useContext(EventsRepo);
  const { search, dateStart, dateEnd, eventTypes, attendanceEventsChecked } = searchContext;

  const fetchQueryEvents = async () => {
    const newEvents = await getAllEvents({
      event_start__gte: dateStart.toISODate(),
      event_end__lte: dateEnd.toISODate(),
      event_type: eventTypes,
    });
    updateEventList(newEvents);
  };

  const eventListAttendanceEventFiltered = useMemo(
    () => getAttendanceEventFiltered(attendanceEventsChecked, eventList),
    [attendanceEventsChecked, eventList]
  );

  const eventListEventTypeFiltered = useMemo(() => getEventTypeFiltered(eventTypes, eventListAttendanceEventFiltered), [
    eventTypes,
    eventListAttendanceEventFiltered,
  ]);

  const eventListDateFiltered = useMemo(() => getDateFiltered(dateStart, dateEnd, eventListEventTypeFiltered), [
    dateStart,
    dateEnd,
    eventListEventTypeFiltered,
  ]);

  const eventListFinal = useMemo(() => getTextFiltered(search.toLowerCase(), eventListDateFiltered), [
    search.toLowerCase(),
    eventListDateFiltered,
  ]);
  const [filteredEvents, setFilteredEvents] = useState(eventListFinal);

  useEffect(() => {
    const t0 = performance.now();
    setFilteredEvents(eventListFinal);
    const t1 = performance.now();
    console.log('Call to useEffect ONE took ' + (t1 - t0) + ' milliseconds.');
  }, [search, attendanceEventsChecked]);

  useEffect(() => {
    const t0 = performance.now();
    fetchQueryEvents().then(() => {
      setFilteredEvents(eventListFinal);
      const t1 = performance.now();
      console.log('Call to useEffect TWO took ' + (t1 - t0) + ' milliseconds.');
    });
  }, [dateEnd, dateStart, eventTypes]);

  return filteredEvents;
};
