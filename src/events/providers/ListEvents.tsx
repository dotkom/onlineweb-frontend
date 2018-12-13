import { prefetch } from 'common/utils/prefetch';
import { getListEvents } from 'events/api/listEvents';
import { IEventViewProps, INewEvent } from 'events/models/Event';
import React, { Component, createContext } from 'react';

export interface IListEventsState {
  events: INewEvent[];
  init: () => void;
}

const INITIAL_STATE: IListEventsState = {
  events: [],
  init: () => {
    throw new Error('Init state was called before component was initialized');
  },
};

export const ListEventsContext = createContext(INITIAL_STATE);

export interface IProps extends IEventViewProps {
  prefetch?: INewEvent[];
}

@prefetch('FrontpageListEvents')
class ListEvents extends Component<IProps, IListEventsState> {
  public static async getServerState(_: IProps): Promise<INewEvent[]> {
    const events = await getListEvents();
    return events;
  }

  constructor(props: IProps) {
    super(props);

    this.state = { ...INITIAL_STATE, events: props.prefetch || [] };
  }

  public init = async () => await this.fetchEvents();

  public async fetchEvents() {
    const events = await getListEvents();
    this.setState({ events });
  }

  public render() {
    const { init } = this;
    const value = { ...this.state, init };
    return <ListEventsContext.Provider value={value}>{this.props.children}</ListEventsContext.Provider>;
  }
}

export default ListEvents;
