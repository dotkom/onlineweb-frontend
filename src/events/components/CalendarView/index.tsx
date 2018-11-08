import React, { Component } from 'react';
import { IEventViewProps } from '../../models/Event';
import { CalendarEventsContext, ICalendarEventsState } from '../../providers/CalendarEvents';
import { getFirstWeekdayOfMonth, getPreviousMonthLength } from '../../utils/calendarUtils';
import style from './calendar.less';
import CalendarTile, { CalendarFillerTiles, createDayList } from './CalendarTile';

export type IProps = IEventViewProps;

class CalendarView extends Component<IProps> {
  public static contextType = CalendarEventsContext;

  public async componentDidMount() {
    const { init }: ICalendarEventsState = this.context;
    await init();
  }

  public render() {
    const { eventMonth, month, changeMonth }: ICalendarEventsState = this.context;

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
          <h3 className={style.monthChanger} onClick={() => changeMonth(-1)} tabIndex={0}>
            {'<'}
          </h3>
          <h3>{month.toFormat('MMMM yyyy')}</h3>
          <h3 className={style.monthChanger} onClick={() => changeMonth(1)} tabIndex={0}>
            {'>'}
          </h3>
        </div>
        <div className={style.grid}>
          <CalendarFillerTiles days={previous} />
          {eventMonth.map((events, index) => (
            <CalendarTile key={`${month.toFormat('yyyy-MM')}-${index + 1}`} events={events} day={index + 1} active />
          ))}
          <CalendarFillerTiles days={next} />
        </div>
      </div>
    );
  }
}

export default CalendarView;
