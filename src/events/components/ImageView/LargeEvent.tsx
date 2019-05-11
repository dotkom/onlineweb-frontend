import { faCalendarAlt, faUser } from '@fortawesome/free-regular-svg-icons/';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { DateTime } from 'luxon';
import React, { FC } from 'react';

import { Link } from 'core/components/Router';
import { getEventColor, getEventType, IEvent, isCompanyEvent } from 'events/models/Event';
import { getEventAttendees } from 'events/utils/attendee';

import EventImage from '../EventImage';
import style from './image.less';

export interface IProps {
  event: IEvent;
}

const LargeEvent: FC<IProps> = ({ event }) => {
  const { image, event_type, title, event_start, attendance_event, id, company_event } = event;
  const color = getEventColor(event_type);
  return (
    <Link to={`/events/${id}`}>
      <div className={style.large}>
        <h2 className={style.imageLargeType} style={{ background: color }}>
          {getEventType(event_type)}
        </h2>
        <EventImage image={image} companyEvents={company_event} size="md" color={color} />
        <div className={style.largeContent}>
          <span style={{ background: color }} />
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
