import React, { Component } from 'react';
import { INewEvent, EventViewProps, getEventColor, getEventType } from '../../models/Event';
import { DateTime } from 'luxon';
import style from './image.less';
import { getEvents } from '../../api/events';
import { DOMAIN } from 'common/constants/endpoints';

export interface IState {
  events: INewEvent[];
}

class ImageView extends Component<EventViewProps, IState> {
  state: IState = {
    events: []
  }

  public async componentDidMount() {
    const events = await getEvents({
      event_end__gte: DateTime.local().toISODate(),
    });

    this.setState({ events });
  }

  public render() {
    const { events } = this.state;
    const large = events.slice(0, 3);
    const small = events.slice(3, 12);
    return (
      <div className={style.Grid}>
        { large.map((event) => <LargeEvent key={event.id} {...event} />) }
        { small.map((event) => <SmallEvent key={event.id} {...event} />) }
      </div>
    )
  }
}

const LargeEvent = ({ image, event_type, title, event_start, attendance_event }: INewEvent) => (
  <div className={style.large}>
    <p className={style.imageLargeType} style={{ background: getEventColor(event_type) }}>{ getEventType(event_type) }</p>
    <img className={style.largeImage} src={image ? (DOMAIN + image.md) : 'https://online.ntnu.no/media/images/responsive/md/86b20aca-4368-4b3a-8f10-707c747eb03f.png'} />
    <div className={style.largeContent}>
      <p> { title } </p>
      <p> { attendance_event ? `${attendance_event.attendees ? attendance_event.attendees.length : '?'}/${attendance_event.max_capacity}` : 'ALLE' } </p>
      <p> { DateTime.fromISO(event_start).toFormat('d.MM') } </p>
    </div>
  </div>
)

const SmallEvent = ({ title, event_type, event_start, attendance_event }: INewEvent) => (
  <div className={style.small}>
    <span
      className={style.smallType}
      style={{ color: getEventColor(event_type) }}
    />
    <p> { title } </p>
    <p> { attendance_event ? `${attendance_event.attendees ? attendance_event.attendees.length : '?'}/${attendance_event.max_capacity}` : 'ALLE' } </p>
    <p> { DateTime.fromISO(event_start).toFormat('d.MM') } </p>
  </div>
)

export default ImageView;
