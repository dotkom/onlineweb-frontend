import { getServerCacheCalendarEvents } from 'events/api/cache';
import { getCalendarEventsControlled } from 'events/api/calendarEvents';
import { getCalendarSession, saveCalendarSession } from 'events/api/calendarSession';
import { IEventViewProps, INewEvent } from 'events/models/Event';
import { DateTime } from 'luxon';
import React, { Component, createContext } from 'react';
import { constructMonthMap } from '../utils/calendarUtils';

export interface ICalendarEventsState {
  eventMonth: INewEvent[][];
  month: DateTime;
  controller?: AbortController;
  changeMonth: (n: number) => void;
  init: () => void;
}

/**
 * The events are stored in a '2D list', where each index of the outer list represents a day in the month.
 * For more information, see the description of the 'contructMonthMap' function.
 */
const EMPTY_EVENT_MONTH = constructMonthMap(DateTime.local(), []);

const INITIAL_STATE: ICalendarEventsState = {
  /** The empty month will let the calendar render all the tiles even without events in it */
  eventMonth: EMPTY_EVENT_MONTH,
  /** The month is represented by an entire DateTime, which may cause unknown edge cases? */
  month: DateTime.local(),
  /**
   * Initial function should not be possible to call, but throws an error if they are, just in case.
   * Methods cannot be used outside the component before it is rendered, and class method have to be
   * created for it to be possible to render the child components that can consume them.
   */
  changeMonth: (_: number) => {
    throw new Error('Month was changed before component was initialized');
  },
  init: async () => {
    throw new Error('Init state was called before component was initialized');
  },
};

export const CalendarEventsContext = createContext(INITIAL_STATE);

export interface IProps extends IEventViewProps {
  cache?: INewEvent[];
}

/**
 * @summary Stores the events and related state for the EventCalendar.
 * @description Stores the events for a month in its state. Changing the month
 * Will currently discard the events and fetch new ones for that month.
 * The selected month with be stored in sessionStorage. sessionStorage will be discarded
 * when the browser is closed.
 * @param {IEventViewProps} props Props given to all of the 3 main event views.
 */
class CalendarEvents extends Component<IProps, ICalendarEventsState> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      ...INITIAL_STATE,
      eventMonth: constructMonthMap(DateTime.local(), props.cache || []),
    };
  }

  /** Fetch the stored month from the browser session */
  public async componentDidMount() {
    await this.getSession();
  }

  /**
   * @summary Initializes the provider by fetching the events.
   * @description Used to fill the state with events. The provider is loaded at a
   * higher level than the component that displays it. We don't want to populate the state
   * when the component is mounted, because the state wont be needed yet. Init can be called when
   * the state of the provider is needed. Such as when the displaying component is mounted.
   */
  public init = async () => await this.fetchEvents();

  /** Fetch the settings stored in the browser session */
  public async getSession() {
    const { month } = await getCalendarSession();
    this.setState({ month });
  }

  /** Set the current settings to the browser session */
  public async setSession() {
    const { month } = this.state;
    await saveCalendarSession({ month });
  }

  /**
   * @summary Abort an ongoing fetch of events.
   * @description The browser should not await event fetches which are not needed anymore.
   * Using the controller to abort will let the browser discard fetch requests which have been started.
   * This resolves the problem which happens when an older request comes back after a more recent one.
   * Changing the month too repidly can easily do that. The component sets the events it recieved lastly
   * to the state, whcih could result in wrong events being displayed for the current month.
   */
  public cancelFetch() {
    const { controller } = this.state;
    if (controller) {
      controller.abort();
    }
  }

  /**
   * @summary Fetch the events for an entire month.
   * @description Calculate the range this month represents.
   * @param {DateTime} month DateTime set to a month of which to fetch events.
   */
  public fetchEvents = async (month: DateTime = this.state.month) => {
    /** Get a promise which resolves to events, and a controller which makes the data fetch abortable */
    const { data, controller } = getCalendarEventsControlled(month);
    this.setState({ controller });

    /** Await the events, construct the month representation and set it to state */
    const { results } = await data;
    const eventMonth = constructMonthMap(month, results);
    this.setState({ eventMonth });
  };

  /**
   * @summary Change the current month by a given number of months.
   * @description Change the month in the state by a number of months.
   * This can be used simply to change the month by one month at a time.
   * Or may for example use number = 6 to change the month by half a year.
   * @param {numberOfMonths} numberOfMonths The number of months to change the state with.
   */
  public changeMonth = async (numberOfMonths: number) => {
    let { month } = this.state;
    this.cancelFetch();

    month =
      numberOfMonths >= 0 ? month.plus({ months: numberOfMonths }) : month.minus({ months: Math.abs(numberOfMonths) });
    this.setState({ month, eventMonth: EMPTY_EVENT_MONTH }, () => this.setSession());

    await this.fetchEvents(month);
  };

  public render() {
    /** Extract the 'public' methods from the class */
    const { changeMonth, init } = this;
    /** Combine the state and the methods to a single object */
    const value = { ...this.state, changeMonth, init };
    return <CalendarEventsContext.Provider value={value}>{this.props.children}</CalendarEventsContext.Provider>;
  }
}

export default CalendarEvents;
