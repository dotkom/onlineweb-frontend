import { prefetch } from 'common/utils/prefetch';
import React, { Component } from 'react';
import { getEvent } from '../../api/events';
import { INewEvent, mockEvent } from '../../models/Event';
import ListEvent from '../ListView/ListEvent';
import Contact from './Contact';
import style from './detail.less';
import InfoBox from './InfoBox';
import PictureCard from './PictureCard';
import Registration from './Registation';

export interface IState {
  eventId: number;
  event: INewEvent | null;
}

export interface IProps {
  eventId: string;
  prefetch?: INewEvent;
}

@prefetch('EventsDetailView')
class DetailView extends Component<IProps, IState> {
  public static async getServerState(props: IProps): Promise<INewEvent> {
    const eventId = parseInt(props.eventId, 10);
    const event = await getEvent(eventId);
    return event;
  }

  constructor(props: IProps) {
    super(props);
    const eventId = parseInt(props.eventId, 10);
    const event = props.prefetch && eventId === props.prefetch.id ? props.prefetch : null;
    this.state = {
      eventId,
      event,
    };
  }

  public async componentDidMount() {
    const { eventId } = this.state;
    const event = await getEvent(eventId);
    this.setState({ event });
  }

  public render() {
    const event = this.state.event || mockEvent;
    return (
      <div className={style.container}>
        <ListEvent {...event} />
        <PictureCard {...event} />
        <InfoBox {...event} />
        <Registration {...event} />
        <Contact {...event} />
      </div>
    );
  }
}

export default DetailView;
