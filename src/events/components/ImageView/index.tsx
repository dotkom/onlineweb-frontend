import React, { Component } from 'react';
import {
  INewEvent,
  EventViewProps,
  getEventColor,
  getEventType,
  EventTypeEnum,
  IAttendanceEvent,
} from '../../models/Event';
import { DateTime } from 'luxon';
import style from './image.less';
import { getEvents } from '../../api/events';
import { DOMAIN } from 'common/constants/endpoints';
import { routes } from '../EventsRouter';
import { Link } from 'react-router-dom';
import IImage from 'common/models/Image';

export interface IState {
  events_left: INewEvent[];
  events_middle: INewEvent[];
  events_right: INewEvent[];
  fetched: boolean;
}

const getEventImage = (image: IImage | null): string => {
  return image
  ? (DOMAIN + image.wide)
  : 'https://online.ntnu.no/media/images/responsive/md/86b20aca-4368-4b3a-8f10-707c747eb03f.png';
};

const getEventAttendees = (attendance: IAttendanceEvent | null): string => {
  return attendance
    ? `${attendance.attendees
      ? attendance.attendees.length
      : '0'}/${attendance.max_capacity}`
    : 'ALLE';
};

class ImageView extends Component<EventViewProps, IState> {
  public state: IState = {
    events_left: [],
    events_middle: [],
    events_right: [],
    fetched: false,
  };

  public async componentDidMount() {
    const events_left = await this.getTypeEvents([EventTypeEnum.BEDPRES]);
    const events_middle = await this.getTypeEvents([EventTypeEnum.KURS]);
    const events_right = await this.getTypeEvents([
      EventTypeEnum.SOSIALT,
      EventTypeEnum.UTFLUKT,
      EventTypeEnum.EKSKURSJON,
      EventTypeEnum.ANNET,
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

    if (!fetched) { return null; }

    return (
      <>
        <div className={style.largeEventGrid}>
          <LargeEvent {...events_left[0]} />
          <LargeEvent {...events_middle[0]} />
          <LargeEvent {...events_right[0]} />
        </div>
        <div className={style.smallEventGrid}>
          <SmallEventColumn events={ events_left.slice(1, 4) }/>
          <SmallEventColumn events={ events_middle.slice(1, 4) }/>
          <SmallEventColumn events={ events_right.slice(1, 4) }/>
        </div>
      </>
    );
  }
}

const SmallEventColumn = ({ events }: { events: INewEvent[] }) => (
  <>{ events.map((event) => <SmallEvent key={event.id} {...event} />) }</>
);

const LargeEvent = ({ image, event_type, title, event_start, attendance_event, id }: INewEvent) => (
  <Link to={`/events/${id}`}>
    <div className={style.large}>
      <p className={style.imageLargeType} style={{ background: getEventColor(event_type) }}>
        { getEventType(event_type) }
      </p>
      <img className={style.largeImage} src={getEventImage(image)} />
      <div className={style.largeContent}>
        <p> { title } </p>
        <p> { getEventAttendees(attendance_event) } </p>
        <p> { DateTime.fromISO(event_start).toFormat('d.MM') } </p>
      </div>
    </div>
  </Link>
);

const SmallEvent = ({ title, event_type, event_start, attendance_event, id }: INewEvent) => (
  <Link to={`/events/${id}`}>
    <div className={style.small}>
      <span
        className={style.smallType}
        style={{ color: getEventColor(event_type) }}
      />
      <p> { title } </p>
      <p> { getEventAttendees(attendance_event) } </p>
      <p> { DateTime.fromISO(event_start).toFormat('d.MM') } </p>
    </div>
  </Link>
);

export default ImageView;
