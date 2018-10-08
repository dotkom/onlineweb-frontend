import React, { Component } from 'react';
import { INewEvent, EventViewProps, getEventColor, getEventType, EventTypeEnum } from '../../models/Event';
import { DateTime } from 'luxon';
import style from './image.less';
import { getEvents } from '../../api/events';
import { DOMAIN } from 'common/constants/endpoints';

export interface IState {
  events_left: INewEvent[];
  events_middle: INewEvent[];
  events_right: INewEvent[];
  fetched: boolean;
}

class ImageView extends Component<EventViewProps, IState> {
  state: IState = {
    events_left: [],
    events_middle: [],
    events_right: [],
    fetched: false,
  }

  public async componentDidMount() {
    const events_left = await this.getTypeEvents([EventTypeEnum.BEDPRES]);
    const events_middle = await this.getTypeEvents([EventTypeEnum.KURS]);
    const events_right = await this.getTypeEvents([
      EventTypeEnum.SOSIALT,
      EventTypeEnum.UTFLUKT,
      EventTypeEnum.EKSKURSJON,
      EventTypeEnum.ANNET
    ]);

    this.setState({ events_left, events_middle, events_right, fetched: true });
  }

  public componentWillUnmount() {
    this.setState({ fetched: false });
  }

  public async getTypeEvents(types: EventTypeEnum[]) {
    return await getEvents({
      event_end__gte: DateTime.local().toISODate(),
      event_type: types,
    });
  }

  public render() {
    const { events_left, events_middle, events_right, fetched } = this.state;

    if (!fetched) { return null }

    return (
      <>
        <div className={style.largeEventGrid}>
          <LargeEvent {...events_left[0]} />
          <LargeEvent {...events_middle[0]} />
          <LargeEvent {...events_right[0]} />
        </div>
        <div className={style.smallEventGrid}>
          <SmallEventColumn events={ events_left.slice(1,4) }/>
          <SmallEventColumn events={ events_middle.slice(1,4) }/>
          <SmallEventColumn events={ events_right.slice(1,4) }/>
        </div>
      </>
    )
  }
}

const SmallEventColumn = ({ events }: { events: INewEvent[] }) => (
  <>{ events.map((event) => <SmallEvent key={event.id} {...event} />) }</>
)

const LargeEvent = ({ image, event_type, title, event_start, attendance_event }: INewEvent) => (
  <div className={style.large}>
    <p className={style.imageLargeType} style={{ background: getEventColor(event_type) }}>{ getEventType(event_type) }</p>
    <img className={style.largeImage} src={image ? (DOMAIN + image.wide) : 'https://online.ntnu.no/media/images/responsive/md/86b20aca-4368-4b3a-8f10-707c747eb03f.png'} />
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
