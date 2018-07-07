import React, { Component } from 'react';
import classNames from 'class-names';
import { INewEvent, EventViewProps, getEventColor, getEventType } from '../../models/Event';
import { DateTime } from 'luxon';
import './list.less';
import { getEvents } from '../../api/events';

export interface IState {
  events: INewEvent[];
}

class ListView extends Component<EventViewProps, IState> {
  state: IState = {
    events: []
  }

  public async componentDidMount() {
    const events = await getEvents();
    this.setState({ events });
  }

  public render() {
    const { events } = this.state;
    return (
      <>
      <div className="event-list-grid">
        { events.map((event) => <ListEvent key={event.id} {...event} />) }
      </div>
      </>
    )
  }
}


const ListEvent = ({ title, event_start, attendance_event, event_type }: INewEvent) => (
  <div className="event-list-element-grid event-list-grid-row">
    { /** First one has to be 1/6 of the line? */ }
    <div className="event-list-element-grid-row">
      <div className="event-type" style={{
          background: getEventColor(event_type),
          color: getEventColor(event_type),
        }}
      >
        <p>{getEventType(event_type)}</p>
      </div>
    </div>

    <div className="event-list-element-grid-row"><p>{ title }</p></div>
    <div className="event-list-element-grid-row"><p>{ attendance_event && attendance_event.attendees ? `${attendance_event.attendees.length}/${attendance_event.max_capacity}` : 'ALLE'}</p></div>
    <div className="event-list-element-grid-row"><p>{ DateTime.fromISO(event_start).toFormat('d.MM') }</p></div>
    <div className="event-list-element-grid-row"><p>{ attendance_event ? 'Y' : 'N' }</p></div>
  </div>
)

export default ListView;
