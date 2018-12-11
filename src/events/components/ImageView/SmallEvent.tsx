import { Link } from 'core/components/Router';
import { getEventColor, INewEvent } from 'events/models/Event';
import { getEventAttendees } from 'events/utils/attendee';
import { DateTime } from 'luxon';
import React from 'react';
import style from './image.less';

const SmallEvent = ({ title, event_type, event_start, attendance_event, id }: INewEvent) => (
  <Link to={`/events/${id}`}>
    <div className={style.small} style={{ color: getEventColor(event_type) }}>
      <p> {title} </p>
      <p> {getEventAttendees(attendance_event)} </p>
      <p> {DateTime.fromISO(event_start).toFormat('dd.MM')} </p>
    </div>
  </Link>
);

const SmallEventColumn = ({ events }: { events: INewEvent[] }) => {
  let column = events.map((event) => <SmallEvent key={event.id} {...event} />);

  column = column.concat([...Array(3 - column.length)].map((_, i) => <a key={i} />));

  return <>{column}</>;
};

export default SmallEventColumn;
