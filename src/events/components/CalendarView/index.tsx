import React, { Component } from 'react';
import { IEventViewProps } from '../../models/Event';
import { getPreviousMonthLength, getFirstWeekdayOfMonth } from '../../utils/calendarUtils';
import CalendarTile, { createDayList, CalendarFillerTiles } from './CalendarTile';
import { CalendarEventsContext, ICalendarEventsState } from '../../providers/CalendarEvents';
import style from './calendar.less';

export type IProps = IEventViewProps & ICalendarEventsState;

class CalendarView extends Component<IProps> {
  public async componentDidMount() {
    const { init } = this.props;
    await init();
  }

  public render() {
    const { eventMonth, month, changeMonth } = this.props;

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
          <h3 onClick={() => changeMonth(-1)}>{'<'}</h3>
          <h3>{month.toFormat('MMMM yyyy')}</h3>
          <h3 onClick={() => changeMonth(1)}>{'>'}</h3>
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

const Provider = (props: IEventViewProps) => (
  <CalendarEventsContext.Consumer>{(state) => <CalendarView {...props} {...state} />}</CalendarEventsContext.Consumer>
);

export default Provider;
