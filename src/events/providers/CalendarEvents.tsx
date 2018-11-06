import { getCalendarSession, saveCalendarSession } from 'events/api/calendarSession';
import { getEvents, IEventAPIParameters } from 'events/api/events';
import { IEventViewProps, INewEvent } from 'events/models/Event';
import { DateTime } from 'luxon';
import React, { Component, createContext } from 'react';
import { constructMonthMap } from '../utils/calendarUtils';

export interface ICalendarEventsState {
  eventMonth: INewEvent[][];
  month: DateTime;
  changeMonth: (n: number) => void;
  init: () => void;
}

const INITIAL_STATE: ICalendarEventsState = {
  eventMonth: constructMonthMap(DateTime.local(), []),
  month: DateTime.local(),
  changeMonth: (n: number) => {
    throw new Error('Month was changed before component was initialized');
  },
  init: async () => {
    throw new Error('Init state was called before component was initialized');
  },
};

export const CalendarEventsContext = createContext(INITIAL_STATE);

class CalendarEvents extends Component<IEventViewProps, ICalendarEventsState> {
  public state: ICalendarEventsState = { ...INITIAL_STATE };

  public async componentDidMount() {
    await this.getSession();
  }

  public init = async () => await this.fetchEvents();

  public async getSession() {
    const { month } = await getCalendarSession();
    this.setState({ month });
  }

  public async setSession() {
    const { month } = this.state;
    await saveCalendarSession({ month });
  }

  public fetchEvents = async (month: DateTime = this.state.month) => {
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
  };

  public changeMonth = async (monthNumber: number) => {
    let { month } = this.state;

    month = monthNumber >= 0 ? month.plus({ months: monthNumber }) : month.minus({ months: Math.abs(monthNumber) });

    await this.fetchEvents(month);
    this.setState({ month }, () => this.setSession());
  };

  public render() {
    const { changeMonth, init } = this;
    const value = { ...this.state, changeMonth, init };
    return <CalendarEventsContext.Provider value={value}>{this.props.children}</CalendarEventsContext.Provider>;
  }
}

export default CalendarEvents;
