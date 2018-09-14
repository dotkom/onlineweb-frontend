import React from 'react';
import { DateTime } from 'luxon';
import { INewEvent, getEventColor, getEventType } from '../../models/Event';
import HostPolygon from './HostPolygon';
import StatusPolygon from './StatusPolygon';

const ListEvent = ({ title, event_start, attendance_event, event_type }: INewEvent) => {
  const eventColor = getEventColor(event_type);
  const eventType = getEventType(event_type);
  const eventDate = DateTime.fromISO(event_start).toFormat('d.MM')
  return (
    <div className="event-list-element-grid event-list-grid-row">
      <div className="event-list-element-grid-row" style={{ left: 0 }}>
        <HostPolygon color={ eventColor } />
        <p>{ eventType }</p>
      </div>

      <div className="event-list-element-grid-row">
        <p style={{ verticalAlign: 'center' }}>{ title }</p>
      </div>
      <div className="event-list-element-grid-row">
        <p>
          { (attendance_event && attendance_event.attendees)
            ? `${attendance_event.attendees.length}/${attendance_event.max_capacity}`
            : 'ALLE'
          }
        </p>
      </div>
      <div className="event-list-element-grid-row">
        <p>{ eventDate }</p>
      </div>
      <div className="event-list-element-grid-row">
        <StatusPolygon color="#828282" />
        <p>{ attendance_event ? 'Y' : 'N' }</p>
      </div>
    </div>
  )
}

export default ListEvent;
