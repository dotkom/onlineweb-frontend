import React, { Component } from 'react';
import { getEvents, IEventAPIParameters } from '../../api/events';
import { INewEvent, getEventColor, getEventType, IEventViewProps } from '../../models/Event';
import { DateTime } from 'luxon';
import { getMonthLength, getPreviousMonthLength, getFirstWeekdayOfMonth } from '../../utils/calendarUtils';
import CalendarTile, { createDayList, CalendarFillerTiles } from './CalendarTile';
import style from './calendar.less';
import { getCalendarSession, saveCalendarSession } from 'events/api/calendarSession';

export interface IState {
  eventMonth: INewEvent[][];
  month: DateTime;
}

/**
 * @summary Create the correct representation of the current month.
 * @description To easily display the events of the given month,
 * the month is represented as an Array of Arrays of Events.
 * The outer Array represents the ((day of the month) - 1) the event is on,
 * while the inner Array represents the events on that day.
 * @param {DateTime} month Current month.
 * @param {INewEvent[]} events Events to inject into the month model.
 * @returns {INewEvent[][]} Events represented in a month model.
 */
export const constructMonthMap = (month: DateTime, events: INewEvent[]): INewEvent[][]  => {
  /**
   * @summary Create an empty EventMonth.
   * @description Create an array of length `daysInMonth`, containing empty arrays.
   */
  const map = [...Array(month.daysInMonth)].map((a) => Array(0).fill([]));
  events.forEach((event) => {
    const day = DateTime.fromISO(event.event_start).day - 1;
    map[day].push(event);
  });
  return map;
};

class CalendarView extends Component<IEventViewProps, IState> {
  public state: IState = {
    eventMonth: constructMonthMap(DateTime.local(), []),
    month: DateTime.local(),
  };

  public async componentDidMount() {
    await this.getSession();
    this.fetchEvents();
  }

  public async getSession() {
    const { month } = await getCalendarSession();
    this.setState({ month });
  }

  public async setSession() {
    const { month } = this.state;
    await saveCalendarSession({ month });
  }

  public async fetchEvents(month: DateTime = this.state.month) {
    const firstDayOfMonth = month.minus({ days: month.day - 1 });
    const lastDayOfMonth = firstDayOfMonth.plus({ months: 1 }).minus({ days: 1 });

    const args: IEventAPIParameters = {
      event_start__gte: firstDayOfMonth.toISODate(),
      event_start__lte: lastDayOfMonth.toISODate(),
      page_size: 60,
    };

    const events = await getEvents(args);
    const eventMonth = constructMonthMap(month, events);
    this.setState({ eventMonth });
  }

  public async changeMonth(number: number) {
    let { month } = this.state;

    month = (number >= 0)
      ? month.plus({ months: number })
      : month.minus({ months: Math.abs(number) });

    await this.fetchEvents(month);
    this.setState({ month }, () => this.setSession());
  }

  public render() {
    const { eventMonth, month } = this.state;

    const firstWeekDay = getFirstWeekdayOfMonth(month.toJSDate());
    const lastDayPrevMonth = getPreviousMonthLength(month.toJSDate());

    const previous = createDayList(firstWeekDay, lastDayPrevMonth - firstWeekDay);
    // 7 - 'number of days last week of the month'
    const next = createDayList(7 - ((month.daysInMonth + firstWeekDay) % 7), 0);

    return (
      <div>
        <div className={style.menuGrid}>
          <h3 onClick={() => this.changeMonth(-1)}>{'<'}</h3>
          <h3>{ month.toFormat('MMMM yyyy') }</h3>
          <h3 onClick={() => this.changeMonth(1)}>{'>'}</h3>
        </div>
        <div className={style.grid}>
          <CalendarFillerTiles days={previous} />
          { eventMonth.map((events, index) => (
            <CalendarTile
              key={`${month.toFormat('yyyy-MM')}-${index + 1}`}
              events={events}
              day={index + 1}
              active
            />
          ))}
          <CalendarFillerTiles days={next} />
        </div>
      </div>
    );
  }
}

export default CalendarView;
