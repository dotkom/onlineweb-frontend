import React from 'react';
import { DateTime } from 'luxon';
import { INewEvent, getEventColor, getEventType } from '../../models/Event';
import HostPolygon from './HostPolygon';
import StatusPolygon from './StatusPolygon';
import style from './list.less';
import { Link } from 'react-router-dom';

const ListEvent = ({ title, event_start, attendance_event, event_type, company_event, id }: INewEvent) => {
  const eventColor = getEventColor(event_type);
  const eventType = getEventType(event_type);
  const eventDate = DateTime.fromISO(event_start).toFormat('d.MM');
  console.log(company_event ? company_event : null);
  return (
    <Link to={`/events/${id}`}>
      <div className={style.gridRow}>
        <div className={style.elementGridRow} style={{ left: 0 }}>
          <HostPolygon color={ eventColor } />
          { /* Optional chainging, tc39 stage 1 proposal. Not supported by Typescript  */ }
          <p>{ company_event[0] ? .company.name || eventType  }</p>
        </div>

        <div className={style.elementGridRow}>
          <p style={{ verticalAlign: 'center' }}>{ title }</p>
        </div>
        <div className={style.elementGridRow}>
          <p>
            { /* Optional chainging, tc39 stage 1 proposal. Not supported by Typescript  */ }
            { attendance_event
              ? `${attendance_event ? .attendees ? .length || 0 }/${attendance_event.max_capacity}`
              : 'ALLE'
            }
          </p>
        </div>
        <div className={style.elementGridRow}>
          <p>{ eventDate }</p>
        </div>
        <div className={style.elementGridRow}>
          <StatusPolygon color="#828282" />
          <p>{ attendance_event ? 'Y' : 'N' }</p>
        </div>
      </div>
    </Link>
  );
};

export default ListEvent;
