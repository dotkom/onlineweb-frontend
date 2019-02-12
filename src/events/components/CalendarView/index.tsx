import { DateTime, Interval } from 'luxon';
import React, { useContext, useEffect, useState } from 'react';

import { useMonth } from 'common/hooks/useMonth';
import { usePrefetch } from 'common/hooks/usePrefetch';
import { PrefetchKey } from 'common/utils/PrefetchState';
import { getCalendarEvents } from 'events/api/calendarEvents';
import { IEventViewProps, INewEvent } from 'events/models/Event';
import { EventsRepo } from 'events/providers/EventsRepo';
import {
  constructMonthMap,
  getFirstDayOfMonth,
  getFirstWeekdayOfMonth,
  getLastDayOfMonth,
  getPreviousMonthLength,
} from 'events/utils/calendarUtils';

import style from './calendar.less';
import CalendarTile, { CalendarFillerTiles, createDayList } from './CalendarTile';
import { MonthChanger } from './MonthChanger';

export type IProps = IEventViewProps;

export const CalendarView = ({  }: IProps) => {
  const { eventList, fetchEventsByMonth } = useContext(EventsRepo);
  const [month, changeMonth] = useMonth();
  const [eventMonth, setEventMonth] = useState<INewEvent[][]>([[]]);

  const prefetch = usePrefetch(PrefetchKey.EVENTS_CALENDAR, async () => {
    const data = await getCalendarEvents(month);
    return {
      eventMonth: constructMonthMap(month, data),
      monthString: month.toFormat('yyyy-MM'),
    };
  });

  const firstWeekDay = getFirstWeekdayOfMonth(month);
  const lastDayPrevMonth = getPreviousMonthLength(month);

  const previous = createDayList(firstWeekDay, lastDayPrevMonth - firstWeekDay);
  // 7 - 'number of days last week of the month' if 'number of days in last week' is not 0
  const next = createDayList(
    (month.daysInMonth + firstWeekDay) % 7 === 0 ? 0 : 7 - ((month.daysInMonth + firstWeekDay) % 7),
    0
  );

  /** Fetch events when the month is changed */
  useEffect(() => {
    fetchEventsByMonth(month);
  }, [month]);

  /** Update stored events when month or list of events is changed */
  useEffect(() => {
    const firstDay = getFirstDayOfMonth(month);
    const lastDay = getLastDayOfMonth(month);
    const monthInterval = Interval.fromDateTimes(firstDay, lastDay);
    const eventsInMonth = eventList.filter((event) => monthInterval.contains(DateTime.fromISO(event.event_start)));
    const eventMonthMap = constructMonthMap(month, eventsInMonth);
    setEventMonth(eventMonthMap);
  }, [month, eventList]);

  const displayEventMonth = eventMonth.some((eventDay) => !!eventDay.length)
    ? eventMonth
    : prefetch && prefetch.monthString === month.toFormat('yyyy-MM')
    ? prefetch.eventMonth
    : constructMonthMap(month, []);

  return (
    <div className={style.gridWrapper}>
      <div className={style.menuGrid}>
        <MonthChanger direction="left" onClick={() => changeMonth(-1)} />
        <h3>{month.toFormat('MMMM yyyy')}</h3>
        <MonthChanger direction="right" onClick={() => changeMonth(1)} />
      </div>
      <div className={style.grid}>
        <CalendarFillerTiles days={previous} />
        {displayEventMonth &&
          displayEventMonth.map((events, index) => (
            <CalendarTile key={`${month.toFormat('yyyy-MM')}-${index + 1}`} events={events} day={index + 1} active />
          ))}
        <CalendarFillerTiles days={next} />
      </div>
    </div>
  );
};

export default CalendarView;
