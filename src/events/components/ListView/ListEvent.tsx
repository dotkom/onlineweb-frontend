import React from 'react';
import { DateTime } from 'luxon';
import { INewEvent, getEventColor, getEventType, IAttendanceEvent } from '../../models/Event';
import HostPolygon from './HostPolygon';
import { StatusPolygon, PersonSVG } from './StatusPolygon';
import style from './list.less';
import { Link } from 'react-router-dom';

const getEventAttendees = (attendance: IAttendanceEvent | null): string => {
  return attendance ? `${attendance.attendees ? attendance.attendees.length : '0'}/${attendance.max_capacity}` : 'ALLE';
};

const ListEvent = ({ title, event_start, attendance_event, event_type, company_event, id }: INewEvent) => {
  const eventColor = getEventColor(event_type);
  const eventType = getEventType(event_type);
  const eventDate = DateTime.fromISO(event_start).toFormat('dd.MM');
  return (
    <Link to={`/events/${id}`}>
      <div className={style.gridRow}>
        <div className={style.elementGridRow}>
          <HostPolygon color={eventColor}>
            {(company_event[0] && company_event[0].company.name) || eventType}
          </HostPolygon>
        </div>
        <div className={style.elementGridRow}>
          <p style={{ verticalAlign: 'center' }}>{title}</p>
        </div>
        <div className={style.elementGridRow}>
          <p> {getEventAttendees(attendance_event)} </p>
        </div>
        <div className={style.elementGridRow}>
          <p>{eventDate}</p>
        </div>
        <div className={style.elementGridRow}>
          <StatusPolygon>{attendance_event ? <PersonSVG color="#fff" /> : null}</StatusPolygon>
        </div>
      </div>
    </Link>
  );
};

export default ListEvent;
