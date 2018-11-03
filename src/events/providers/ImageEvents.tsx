import React, { createContext, Component } from 'react';
import { EventTypeEnum, INewEvent, IEventViewProps } from 'events/models/Event';
import { DateTime } from 'luxon';
import { getEvents } from 'events/api/events';

export interface IImageEventsState {
  eventsLeft: INewEvent[];
  eventsMiddle: INewEvent[];
  eventsRight: INewEvent[];
  fetched: boolean;
  init: () => void;
}

const INITIAL_STATE: IImageEventsState = {
  eventsLeft: [],
  eventsMiddle: [],
  eventsRight: [],
  fetched: false,
  init: () => {
    throw new Error('Init state was called before component was initialized');
  },
};

export const ImageEventsContext = createContext(INITIAL_STATE);

class ImageEvents extends Component<IEventViewProps, IImageEventsState> {
  public state: IImageEventsState = { ...INITIAL_STATE };

  public init = async () => await this.getEventsParallell();

  public async getEventsParallell() {
    const left = this.getTypeEvents([EventTypeEnum.BEDPRES]);
    const middle = this.getTypeEvents([EventTypeEnum.KURS]);
    const right = this.getTypeEvents([
      EventTypeEnum.SOSIALT,
      EventTypeEnum.UTFLUKT,
      EventTypeEnum.EKSKURSJON,
      EventTypeEnum.ANNET,
    ]);

    const [eventsLeft, eventsMiddle, eventsRight] = await Promise.all([left, middle, right]);

    this.setState({ eventsLeft, eventsMiddle, eventsRight, fetched: true });
  }

  public async getTypeEvents(types: EventTypeEnum[]) {
    return await getEvents({
      event_end__gte: DateTime.local().toISODate(),
      event_type: types,
      page_size: 4,
    });
  }

  public render() {
    const { init } = this;
    const value = { ...this.state, init };
    return <ImageEventsContext.Provider value={value}>{this.props.children}</ImageEventsContext.Provider>;
  }
}

export default ImageEvents;
