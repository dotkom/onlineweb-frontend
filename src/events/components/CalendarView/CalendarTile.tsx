import React from 'react';
import { INewEvent, getEventColor } from '../../models/Event';
import classNames from 'classnames';

export interface ITileProps {
  events: INewEvent[];
  active?: boolean;
  day: number;
}

export const createDayList = (amount: number, start: number): number[] => {
  let l = [];
  for (let i = 0; i < amount; i++) {
    l.push(i + start + 1)
  }
  return l;
}

export const CalendarEventTile = ({ events, active = true, day}: ITileProps) => {
  return (
    <div
      className={classNames('calendar-event-tile', {
        'calendar-event-tile-inactive': !active,
      })}
    >
      <div className="calendar-event-tile-content">
        <p className="calendar-event-tile-date">{ day }</p>
        { events.map((event) => <CalendarEvent key={event.id} {...event} />) }
      </div>
    </div>
  )
}

export const CalendarFillerTiles = ({ days }: { days: number[] }) => (
  <>
    { days.map((day) => (
      <div className="calendar-event-tile calendar-event-tile-inactive" key={`filler-${day}`}>
        <div className="calendar-event-tile-content">
          <p className="calendar-event-tile-date">{ day }</p>
        </div>
      </div>
    )) }
  </>
)

export const CalendarEvent = ({ event_type, title }: INewEvent) => (
  <p
    className="calendar-event-title"
    style={{ background: getEventColor(event_type) }}
    title={title}
  >
    { title }
  </p>
)

export default CalendarEventTile;
