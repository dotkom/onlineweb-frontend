import { getImageEvents } from 'events/api/imageEvents';
import { IEventViewProps, INewEvent } from 'events/models/Event';
import React, { Component, createContext } from 'react';

export interface IImageEvents {
  eventsLeft: INewEvent[];
  eventsMiddle: INewEvent[];
  eventsRight: INewEvent[];
}

export interface IImageEventsState extends IImageEvents {
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

export interface IProps extends IEventViewProps {
  cache?: IImageEvents;
}

class ImageEvents extends Component<IProps, IImageEventsState> {
  constructor(props: IProps) {
    super(props);
    const cache = props.cache ? { ...props.cache, fetched: true } : INITIAL_STATE;
    this.state = { ...INITIAL_STATE, ...cache };
  }

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
