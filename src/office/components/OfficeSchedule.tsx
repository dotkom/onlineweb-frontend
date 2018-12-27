import React, { ContextType, PureComponent } from 'react';

import style from 'events/components/CalendarView/calendar.less';
import { CalendarFillerTiles, createDayList } from 'events/components/CalendarView/CalendarTile';
import { getFirstWeekdayOfMonth, getPreviousMonthLength } from 'events/utils/calendarUtils';
import { OfficeCalendarContext } from 'office/providers/OfficeCalendar';

import ScheduleTile from './ScheduleTile';

class OfficeSchedule extends PureComponent<{}> {
  public static contextType = OfficeCalendarContext;
  public context!: ContextType<typeof OfficeCalendarContext>;

  public render() {
    const { eventMonth, month } = this.context;

    const firstWeekDay = getFirstWeekdayOfMonth(month.toJSDate());
    const lastDayPrevMonth = getPreviousMonthLength(month.toJSDate());

    const previous = createDayList(firstWeekDay, lastDayPrevMonth - firstWeekDay);
    // 7 - 'number of days last week of the month' if 'number of days in last week' is not 0
    const next = createDayList(
      (month.daysInMonth + firstWeekDay) % 7 === 0 ? 0 : 7 - ((month.daysInMonth + firstWeekDay) % 7),
      0
    );

    return (
      <div className={style.gridWrapper}>
        <div className={style.menuGrid}>
          <h3 className={style.monthChanger} onClick={() => ({})} tabIndex={0}>
            {'<'}
          </h3>
          <h3>{month.toFormat('MMMM yyyy')}</h3>
          <h3 className={style.monthChanger} onClick={() => ({})} tabIndex={0}>
            {'>'}
          </h3>
        </div>
        <div className={style.grid}>
          <CalendarFillerTiles days={previous} />
          {eventMonth.map((events, index) => (
            <ScheduleTile key={`${month.toFormat('yyyy-MM')}-${index + 1}`} events={events} day={index + 1} active />
          ))}
          <CalendarFillerTiles days={next} />
        </div>
      </div>
    );
  }
}

export default OfficeSchedule;
