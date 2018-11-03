import React, { createContext, Component } from 'react';
import { DateTime } from 'luxon';
import { INewEvent, IEventViewProps } from 'events/models/Event';
import { getEvents } from 'events/api/events';

export interface IListEventsState  {
  events: INewEvent[];
  init: () => void;
}

const INITIAL_STATE: IListEventsState = {
  events: [],
  init: () => { throw new Error('Init state was called before component was initialized'); },
};

export const ListEventsContext = createContext(INITIAL_STATE);

class ListEvents extends Component<IEventViewProps, IListEventsState> {

  public state: IListEventsState = { ...INITIAL_STATE };

  public init = async () => await this.fetchEvents();

  public async fetchEvents() {
    const events = await getEvents({
      event_end__gte: DateTime.local().toISODate(),
    });

    this.setState({ events });
  }

  public render() {
    const { init } = this;
    const value = { ...this.state, init };
    return (
      <ListEventsContext.Provider value={value}>
        { this.props.children }
      </ListEventsContext.Provider>
    );
  }
}

export default ListEvents;
