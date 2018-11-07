import React, { Component } from 'react';
import { getEvent } from '../../api/events';
import { INewEvent, mockEvent } from '../../models/Event';
import ListEvent from '../ListView/ListEvent';
import Contact from './Contact';
import style from './detail.less';
import InfoBox from './InfoBox';
import PictureCard from './PictureCard';
import Registration from './Registation';

export interface IProps {
  eventId: string;
}

export interface IState {
  eventId: number;
  event: INewEvent | null;
}

class DetailView extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      eventId: parseInt(props.eventId, 10),
      event: null,
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
