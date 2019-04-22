import { faCalendarAlt, faUser } from '@fortawesome/free-regular-svg-icons/';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { getEventAttendees } from 'events/utils/attendee';
import { DateTime } from 'luxon';
import React from 'react';
import { EventTypeEnum, getEventColor, getEventType, IEvent } from '../../models/Event';
import style from './list.less';

const ListEvent = ({ title, event_start, attendance_event, event_type, company_event }: IEvent) => {
  const eventColor = getEventColor(event_type);
  const eventType = getEventType(event_type);
  const eventDate = DateTime.fromISO(event_start).toFormat('dd.MM');
  const eventAttendees = getEventAttendees(attendance_event);
  const isCompanyEvent = [EventTypeEnum.BEDPRES, EventTypeEnum.KURS].includes(event_type) && company_event.length === 1;

  return (
    <div className={style.gridRow}>
      <div className={style.eventTypeDiv}>
        <span style={{ background: eventColor }} />
        <p className={style.eventType} style={{ color: eventColor }}>
          {eventType}
        </p>
      </div>
      <p className={style.eventTitle}>{isCompanyEvent ? company_event[0].company.name : title}</p>
      <div className={style.icon}>
        <FontAwesomeIcon icon={faCalendarAlt} fixedWidth />
      </div>
      <p className={style.suppText}> {eventDate} </p>
      <div className={style.icon}>
        <FontAwesomeIcon icon={faUser} fixedWidth />
      </div>
      <p className={style.suppText}> {eventAttendees} </p>
    </div>
  );
};

export default ListEvent;
