import { faCalendarAlt, faUser } from '@fortawesome/free-regular-svg-icons/';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'core/components/Router';
import { getEventColor, IEvent, isCompanyEvent } from 'events/models/Event';
import { getEventAttendees } from 'events/utils/attendee';
import { DateTime } from 'luxon';
import React from 'react';
import style from './image.less';

const SmallEvent = ({ title, event_type, event_start, attendance_event, id, company_event }: IEvent) => (
  <Link to={`/events/${id}`}>
    <div className={style.small}>
      <span style={{ background: getEventColor(event_type) }} />
      <p>{isCompanyEvent(event_type, company_event) ? company_event[0].company.name : title}</p>
      <div className={style.icon}>
        <FontAwesomeIcon icon={faCalendarAlt} fixedWidth />
      </div>
      <p className={style.suppText}> {DateTime.fromISO(event_start).toFormat('dd.MM')} </p>
      <div className={style.icon}>
        <FontAwesomeIcon icon={faUser} fixedWidth />
      </div>
      <p className={style.suppText}> {getEventAttendees(attendance_event)} </p>
    </div>
  </Link>
);

const SmallEventColumn = ({ events }: { events: IEvent[] }) => {
  return (
    <>
      {events.map((event) => (
        <SmallEvent key={event.id} {...event} />
      ))}
    </>
  );
};

export default SmallEventColumn;
