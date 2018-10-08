import React, { Component } from 'react';
import { INewEvent, mockEvent } from '../../models/Event';
import { getEvent } from '../../api/events';
import ListEvent from '../ListView/ListEvent';
import PictureCard from './PictureCard';
import style from './detail.less';
import InfoBox from './InfoBox';
import Registration from './Registation';
import Contact from './Contact';

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
      event: null
    };
  }

  public async componentDidMount() {
    const { eventId } = this.state;
    const event = await getEvent(eventId);
    this.setState({ event });
  }

  public render() {
    const { event, eventId } = this.state;
    const e = event || mockEvent;
    return (
      <div className={style.container}>
        <div className={style.leftContainer}>
          <ListEvent key={eventId} {...e} />
          <PictureCard key={eventId} {...e} />
          <InfoBox {...e}/>
        </div>
        <div className={style.rightContainer}>
          <Registration {...e} />
          <Contact {...e} />
        </div>
      </div>
    )
  }
}

export default DetailView;
