import { getEventAttendees } from 'events/utils/attendee';
import { DateTime } from 'luxon';
import React from 'react';
import { getEventColor, getEventType, INewEvent } from '../../models/Event';
import HostPolygon from './HostPolygon';
import style from './list.less';
import { PersonSVG, StatusPolygon } from './StatusPolygon';

const ListEvent = ({ title, event_start, attendance_event, event_type, company_event, id }: INewEvent) => {
  const eventColor = getEventColor(event_type);
  const eventType = getEventType(event_type);
  const eventDate = DateTime.fromISO(event_start).toFormat('d.MM');

  return (
    <div className={style.gridRow}>
      <div className={style.elementGridRow}>
        <HostPolygon color={eventColor}>{(company_event[0] && company_event[0].company.name) || eventType}</HostPolygon>
      </div>
      <div className={style.elementGridRow}>
        <p>{title}</p>
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
  );
};

export default ListEvent;
