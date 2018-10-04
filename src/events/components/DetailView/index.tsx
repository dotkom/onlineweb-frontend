import React, { Component } from 'react';
import { INewEvent, mockEvent } from '../../models/Event';
import { getEvent } from '../../api/events';
import ListEvent from '../ListView/ListEvent';
import PictureCard from './PictureCard';
import style from './detail.less';

export interface IProps {
  
}

export interface IState {
  eventId: number;
  event: INewEvent | null;
}

class DetailView extends Component<IProps, IState> {
  state: IState = {
    eventId: 500,
    event: null
  };

  public async componentDidMount() {
    const { eventId } = this.state;
    const event = await getEvent(eventId);
    this.setState({ event });
  }

  public render() {
    const { event, eventId } = this.state;
    const e = event || mockEvent;
    return (
      <div style={{ marginTop: '8rem' }}>
        <div>
          <ListEvent key={eventId} {...e} />
        </div>
        <div className={style.pictureCardContainer}>
          <PictureCard key={eventId} {...e} />
        </div>
      </div>
    )
  }
}

export default DetailView;
