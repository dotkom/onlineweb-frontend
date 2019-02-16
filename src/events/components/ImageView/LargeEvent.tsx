import { faCalendarAlt, faUser } from '@fortawesome/free-regular-svg-icons/';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'core/components/Router';
import { getEventColor, getEventType, INewEvent } from 'events/models/Event';
import { getEventAttendees } from 'events/utils/attendee';
import { DateTime } from 'luxon';
import React from 'react';
import EventImage from '../EventImage';
import style from './image.less';

const LargeEvent = ({ image, event_type, title, event_start, attendance_event, id, company_event }: INewEvent) => {
  return (
    <Link to={`/events/${id}`}>
      <div className={style.large}>
        <h2 className={style.imageLargeType} style={{ background: getEventColor(event_type) }}>
          {getEventType(event_type)}
        </h2>
        <EventImage className={style.largeImage} image={image} companyEvents={company_event} size="md" />
        <div className={style.largeContent}>
          <span style={{ background: getEventColor(event_type) }} />
          <p>{title}</p>
          <div className={style.textWithIcon}>
            <FontAwesomeIcon icon={faCalendarAlt} fixedWidth />
            <p>{DateTime.fromISO(event_start).toFormat('dd.MM')}</p>
          </div>
          <div className={style.textWithIcon}>
            <FontAwesomeIcon icon={faUser} fixedWidth />
            <p>{getEventAttendees(attendance_event)}</p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default LargeEvent;
