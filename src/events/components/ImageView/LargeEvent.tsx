import { faCalendarAlt, faUser } from '@fortawesome/free-regular-svg-icons/';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'core/components/Router';
import { getEventColor, getEventType, IEvent, isCompanyEvent } from 'events/models/Event';
import { getEventAttendees } from 'events/utils/attendee';
import { DateTime } from 'luxon';
import React from 'react';
import EventImage from '../EventImage';
import style from './image.less';

const LargeEvent = ({ image, event_type, title, event_start, attendance_event, id, company_event }: IEvent) => {
  return (
    <Link to={`/events/${id}`}>
      <div className={style.large}>
        <h2 className={style.imageLargeType} style={{ background: getEventColor(event_type) }}>
          {getEventType(event_type)}
        </h2>
        <EventImage className={style.largeImage} image={image} companyEvents={company_event} size="md" />
        <div className={style.largeContent}>
          <span style={{ background: getEventColor(event_type) }} />
          <p className={style.eventTitle}>
            {isCompanyEvent(event_type, company_event) ? company_event[0].company.name : title}
          </p>
          <div className={style.icon}>
            <FontAwesomeIcon icon={faCalendarAlt} fixedWidth />
          </div>
          <p className={style.suppText}>{DateTime.fromISO(event_start).toFormat('dd.MM')}</p>
          <div className={style.icon}>
            <FontAwesomeIcon icon={faUser} fixedWidth />
          </div>
          <p className={style.suppText}>{getEventAttendees(attendance_event)}</p>
        </div>
      </div>
    </Link>
  );
};

export default LargeEvent;
