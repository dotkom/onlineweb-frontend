import React, { Component } from 'react';
import {
  INewEvent,
  IEventViewProps,
  getEventColor,
  getEventType,
  EventTypeEnum,
  IAttendanceEvent,
  ICompanyEvent,
} from '../../models/Event';
import { DateTime } from 'luxon';
import style from './image.less';
import { getEvents } from '../../api/events';
import { DOMAIN } from 'common/constants/endpoints';
import { routes } from '../EventsRouter';
import { Link } from 'react-router-dom';
import IImage from 'common/models/Image';

export interface IState {
  eventsLeft: INewEvent[];
  eventsMiddle: INewEvent[];
  eventsRight: INewEvent[];
  fetched: boolean;
}

const getEventImage = (image: IImage | null, company_event: ICompanyEvent[]) => {
  return image
  ? DOMAIN + image.wide
  : company_event[0]
  ? DOMAIN + company_event[0].company.image.wide
  : 'https://online.ntnu.no/media/images/responsive/md/86b20aca-4368-4b3a-8f10-707c747eb03f.png';
};

const getEventAttendees = (attendance: IAttendanceEvent | null): string => {
  return attendance
    ? `${attendance.attendees
      ? attendance.attendees.length
      : '0'}/${attendance.max_capacity}`
    : 'ALLE';
};

class ImageView extends Component<IEventViewProps, IState> {
  public state: IState = {
    eventsLeft: [],
    eventsMiddle: [],
    eventsRight: [],
    fetched: false,
  };

  public componentDidMount() {
    this.getEventsParallell();
  }

  public componentWillUnmount() {
    this.setState({ fetched: false });
  }

  public async getEventsParallell() {
    const left = this.getTypeEvents([EventTypeEnum.BEDPRES]);
    const middle = this.getTypeEvents([EventTypeEnum.KURS]);
    const right = this.getTypeEvents([
      EventTypeEnum.SOSIALT,
      EventTypeEnum.UTFLUKT,
      EventTypeEnum.EKSKURSJON,
      EventTypeEnum.ANNET,
    ]);

    const [eventsLeft, eventsMiddle, eventsRight] = await Promise.all([left, middle, right]);

    this.setState({ eventsLeft, eventsMiddle, eventsRight, fetched: true });
  }

  public async getTypeEvents(types: EventTypeEnum[]) {
    return await getEvents({
      event_end__gte: DateTime.local().toISODate(),
      event_type: types,
      page_size: 4,
    });
  }

  public render() {
    const { eventsLeft, eventsMiddle, eventsRight, fetched } = this.state;

    if (!fetched) { return null; }

    return (
      <>
        <div className={style.largeEventGrid}>
          <LargeEvent {...eventsLeft[0]} />
          <LargeEvent {...eventsMiddle[0]} />
          <LargeEvent {...eventsRight[0]} />
        </div>
        <div className={style.smallEventGrid}>
          <SmallEventColumn events={ eventsLeft.slice(1, 4) }/>
          <SmallEventColumn events={ eventsMiddle.slice(1, 4) }/>
          <SmallEventColumn events={ eventsRight.slice(1, 4) }/>
        </div>
      </>
    );
  }
}

const SmallEventColumn = ({ events }: { events: INewEvent[] }) => {
  let column = events.map((event) => <SmallEvent key={event.id} {...event} />);

  column = column.concat(Array.apply(null, {
    length: 3 - column.length,
  }).map((x: null, i: number) => <a key={i} />));

  return(
    <>{ column }</>
  );
};

const LargeEvent = ({ image, event_type, title, event_start, attendance_event, id, company_event }: INewEvent) => (
  <Link to={`/events/${id}`}>
    <div className={style.large}>
      <p className={style.imageLargeType} style={{ background: getEventColor(event_type) }}>
        { getEventType(event_type) }
      </p>
      <img className={style.largeImage} src={getEventImage(image, company_event)} />
      <div className={style.largeContent}>
        <p> { title } </p>
        <p> { getEventAttendees(attendance_event) } </p>
        <p> { DateTime.fromISO(event_start).toFormat('dd.MM') } </p>
      </div>
    </div>
  </Link>
);

const SmallEvent = ({ title, event_type, event_start, attendance_event, id }: INewEvent) => (
  <Link to={`/events/${id}`}>
    <div className={style.small} style={{ color: getEventColor(event_type) }}>
      <p> { title } </p>
      <p> { getEventAttendees(attendance_event) } </p>
      <p> { DateTime.fromISO(event_start).toFormat('dd.MM') } </p>
    </div>
  </Link>
);

export default ImageView;
