import React from 'react';
import { DateTime } from 'luxon';
import { INewEvent, getEventColor, getEventType } from '../../models/Event';
import HostPolygon from './HostPolygon';
import StatusPolygon from './StatusPolygon';
import style from './list.less';

const ListEvent = ({ title, event_start, attendance_event, event_type }: INewEvent) => {
  const eventColor = getEventColor(event_type);
  const eventType = getEventType(event_type);
  const eventDate = DateTime.fromISO(event_start).toFormat('d.MM')
  return (
    <div className={style.gridRow}>
      <div className={style.elementGridRow} style={{ left: 0 }}>
        <HostPolygon color={ eventColor } />
        <p>{ eventType }</p>
      </div>

      <div className={style.elementGridRow}>
        <p style={{ verticalAlign: 'center' }}>{ title }</p>
      </div>
      <div className={style.elementGridRow}>
        <p>
          { (attendance_event && attendance_event.attendees)
            ? `${attendance_event.attendees.length}/${attendance_event.max_capacity}`
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
  )
}

export default ListEvent;
