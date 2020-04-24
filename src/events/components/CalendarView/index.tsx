import React, { useEffect } from 'react';

import { useMonth } from 'common/hooks/useMonth';
import { getDatesInInterval, getFirstDayOfWeekForMonth, getLastDayOfWeekForMonth } from 'events/utils/calendarUtils';

import { useDispatch } from 'core/redux/hooks';
import { fetchEventsInInterval } from 'events/slices/events';
import { EventCalendarTile } from './CalendarTile';
import { MonthChanger } from './MonthChanger';

import style from './CalendarView.less';
import { Interval } from 'luxon';

export const CalendarView = () => {
  const dispatch = useDispatch();
  const [month, changeMonth] = useMonth();
  const firstDay = getFirstDayOfWeekForMonth(month);
  const lastDay = getLastDayOfWeekForMonth(month);
  const days = getDatesInInterval(firstDay, lastDay);

  /** Fetch events when the month is changed */
  useEffect(() => {
    const interval = Interval.fromDateTimes(firstDay, lastDay);
    dispatch(fetchEventsInInterval(interval));
  }, [firstDay.toISODate(), lastDay.toISODate()]);

  return (
    <div>
      <div className={style.menuGrid}>
        <MonthChanger direction="left" onClick={() => changeMonth(-1)} />
        <h3>{month.toFormat('MMMM yyyy')}</h3>
        <MonthChanger direction="right" onClick={() => changeMonth(1)} />
      </div>
      <div className={style.grid}>
        {days.map((day) => (
          <EventCalendarTile key={day.toISODate()} date={day} active={day.hasSame(month, 'month')} />
        ))}
      </div>
    </div>
  );
};

export default CalendarView;
