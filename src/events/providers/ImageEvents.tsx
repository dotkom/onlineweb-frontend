import { prefetch } from 'common/utils/prefetch';
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
  prefetch?: IImageEvents;
}

@prefetch('FrontpageImageEvents')
class ImageEvents extends Component<IProps, IImageEventsState> {
  public static async getServerState(_: IProps): Promise<IImageEvents> {
    const [eventsLeft, eventsMiddle, eventsRight] = await getImageEvents();
    return { eventsLeft, eventsMiddle, eventsRight };
  }

  constructor(props: IProps) {
    super(props);
    const fetched = !!props.prefetch;
    this.state = { ...INITIAL_STATE, ...props.prefetch, fetched };
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
