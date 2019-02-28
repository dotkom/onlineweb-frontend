import { faCalendarAlt, faUser } from '@fortawesome/free-regular-svg-icons/';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { getEventAttendees } from 'events/utils/attendee';
import { DateTime } from 'luxon';
import React from 'react';
import { getEventColor, getEventType, INewEvent } from '../../models/Event';
import style from './list.less';

const ListEvent = ({ title, event_start, attendance_event, event_type, company_event }: INewEvent) => {
  const eventColor = getEventColor(event_type);
  const eventType = getEventType(event_type);
  const eventDate = DateTime.fromISO(event_start).toFormat('d.MM');
  const eventAttendees = getEventAttendees(attendance_event);

  return (
    <div className={style.gridRow}>
      <span style={{ background: eventColor }} />
      <div className={style.eventText}>
        <p style={{ color: eventColor }}>{eventType}</p>
        <p className={style.eventTitle}>{company_event.length === 1 ? company_event[0].company.name : title}</p>
      </div>
      <div className={style.icon}>
        <FontAwesomeIcon icon={faCalendarAlt} fixedWidth />
      </div>
      <p> {eventDate} </p>
      <div className={style.icon}>
        <FontAwesomeIcon icon={faUser} fixedWidth />
      </div>
      <p> {eventAttendees} </p>
    </div>
  );
};

export default ListEvent;
