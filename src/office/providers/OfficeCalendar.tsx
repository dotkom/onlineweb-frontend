import { DateTime } from 'luxon';
import React, { Component, createContext } from 'react';

import { ICalendarItem } from 'common/utils/api/google/models/calendar';
import { constructMonthMap } from 'events/utils/calendarUtils';
import { getOfficeSchedule } from 'office/api/schedule';

export interface IOfficeCalendarState {
  eventMonth: ICalendarItem[][];
  month: DateTime;
  init: () => void;
}

const INITIAL_STATE: IOfficeCalendarState = {
  eventMonth: [],
  month: DateTime.local(),
  init: () => {
    throw new Error('Initial state init() was called without beeing overwritten');
  },
};

export const OfficeCalendarContext = createContext(INITIAL_STATE);

class OfficeCalendar extends Component<{}, IOfficeCalendarState> {
  public state: IOfficeCalendarState = {
    ...INITIAL_STATE,
  };

  public componentDidMount() {
    this.init();
  }

  public init = async () => {
    this.fetchEvents();
  };

  public async fetchEvents() {
    const { month } = this.state;
    const firstDayOfMonth = month.minus({ days: month.day - 1 });
    const lastDayOfMonth = firstDayOfMonth.plus({ months: 1 }).minus({ days: 1 });

    const calendarData = await getOfficeSchedule({
      singleEvents: true,
      timeMax: lastDayOfMonth.toISO(),
      timeMin: firstDayOfMonth.toISO(),
    });
    const eventMonth = constructMonthMap(month, calendarData.items, ({ start }: ICalendarItem) => start.dateTime);
    this.setState({ eventMonth });
  }

  public render() {
    const { init } = this;
    const value = { init, ...this.state };
    return <OfficeCalendarContext.Provider value={value}>{this.props.children}</OfficeCalendarContext.Provider>;
  }
}

export default OfficeCalendar;
