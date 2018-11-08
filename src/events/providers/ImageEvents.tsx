import { getStateCache } from 'common/utils/stateCacheResolver';
import { getImageEvents } from 'events/api/imageEvents';
import { IEventViewProps, INewEvent } from 'events/models/Event';
import React, { Component, createContext } from 'react';

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
  public state: IImageEventsState = {
    ...INITIAL_STATE,
    eventsLeft: getStateCache().events.image.left,
    eventsMiddle: getStateCache().events.image.middle,
    eventsRight: getStateCache().events.image.right,
    fetched: true,
  };

  public init = async () => await this.getEvents();

  public async getEvents() {
    const [eventsLeft, eventsMiddle, eventsRight] = await getImageEvents();
    this.setState({ eventsLeft, eventsMiddle, eventsRight, fetched: true });
  }

  public render() {
    const { init } = this;
    const value = { ...this.state, init };
    return <ImageEventsContext.Provider value={value}>{this.props.children}</ImageEventsContext.Provider>;
  }
}

export default ImageEvents;
