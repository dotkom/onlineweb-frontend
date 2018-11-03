import React from 'react';
import { Link } from 'react-router-dom';
import style from './image.less';
import { INewEvent, getEventColor, IAttendanceEvent } from 'events/models/Event';
import { DateTime } from 'luxon';

const getEventAttendees = (attendance: IAttendanceEvent | null): string => {
  return attendance
    ? `${attendance.attendees
      ? attendance.attendees.length
      : '0'}/${attendance.max_capacity}`
    : 'ALLE';
};

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

  column = column.concat(Array.apply(null, {
    length: 3 - column.length,
  }).map((x: null, i: number) => <a key={i} />));

  return(
    <>{ column }</>
  );
};

export default SmallEventColumn;
