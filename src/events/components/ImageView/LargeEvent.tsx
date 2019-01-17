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
          <p>{title}</p>
          <p>{getEventAttendees(attendance_event)}</p>
          <p>{DateTime.fromISO(event_start).toFormat('dd.MM')}</p>
        </div>
      </div>
    </Link>
  );
};

export default LargeEvent;
