import { DateTime } from 'luxon';
import { useContext, useEffect, useMemo, useRef, useState } from 'react';

import { QueryParams } from 'core/providers/QueryParams';
import { useDispatch, useSelector } from 'core/redux/hooks';
import { EventTypeEnum, IEvent } from 'events/models/Event';
import { eventSelectors, fetchEvents } from 'events/slices/events';
import { isAfter, isBefore, isInDateRange } from '../utils/eventTimeUtils';

export type EventMap = Map<number, IEvent>;

const getTextFiltered = (search: string, eventList: IEvent[]) =>
  eventList.filter(
    (event: IEvent) =>
      event.title.toLowerCase().includes(search) ||
      event.description.toLowerCase().includes(search) ||
      event.ingress.toLowerCase().includes(search) ||
      event.location.toLowerCase().includes(search)
  );

const getEventTypeFiltered = (eventTypes: EventTypeEnum[], eventList: IEvent[]) =>
  eventList.filter((event) => eventTypes.includes(event.event_type));

const getDateFiltered = (dateStart: DateTime, dateEnd: DateTime, eventList: IEvent[]) =>
  dateEnd && dateStart
    ? eventList.filter((event) => isInDateRange(event, dateStart, dateEnd))
    : dateStart
    ? eventList.filter((event) => isAfter(event, dateStart))
    : dateEnd
    ? eventList.filter((event) => isBefore(event, dateEnd))
    : eventList;

const getAttendanceEventFiltered = (attendanceEventsChecked: boolean, eventList: IEvent[]) =>
  !attendanceEventsChecked ? eventList.filter((event) => event.is_attendance_event) : eventList;

const useFilteredEventList = () => {
  const dispatch = useDispatch();
  const eventList = useSelector((state) => eventSelectors.selectAll(state));
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
      dispatch(fetchEvents(options));
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

const useDebounce = (value: IEvent[], delay: number) => {
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
