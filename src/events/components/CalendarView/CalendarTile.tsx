import classNames from 'classnames';
import { Link } from 'core/components/Router';
import React from 'react';
import { getEventColor, INewEvent } from '../../models/Event';
import style from './calendar.less';

export interface ITileProps {
  events: INewEvent[];
  active?: boolean;
  day: number;
}

export const createDayList = (amount: number, start: number): number[] => {
  const l = [];
  for (let i = 0; i < amount; i++) {
    l.push(i + start + 1);
  }
  return l;
};

export const CalendarEventTile = ({ events, active = true, day }: ITileProps) => {
  return (
    <div
      className={classNames(style.tile, {
        [style.tileInactive]: !active,
      })}
    >
      <div className={style.tileContent}>
        <p>{day}</p>
        {events.map((event) => (
          <CalendarEvent key={event.id} {...event} />
        ))}
      </div>
    </div>
  );
};

export const CalendarFillerTiles = ({ days }: { days: number[] }) => (
  <>
    {days.map((day) => (
      <div className={style.tile + ' ' + style.tileInactive} key={`filler-${day}`}>
        <div className={style.tileContent}>
          <p>{day}</p>
        </div>
      </div>
    ))}
  </>
);

export const CalendarEvent = ({ event_type, title, id, company_event }: INewEvent) => (
  <Link to={`/events/${id}`}>
    <p className={style.title} style={{ background: getEventColor(event_type) }} title={title}>
      {company_event.length === 1 ? company_event[0].company.name : title}
    </p>
  </Link>
);

export default CalendarEventTile;
