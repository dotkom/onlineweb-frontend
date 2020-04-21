import classNames from 'classnames';
import React from 'react';

import HoverCard from 'common/components/HoverCard';
import { getEventUrl } from 'core/appUrls';
import { Link } from 'core/components/Router';

import { getEventColor, IEvent } from '../../models/Event';
import style from './calendar.less';
import CalendarHoverCard from './CalendarHoverCard';

export interface ITileProps {
  events: IEvent[];
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

export const CalendarEvent = (event: IEvent) => (
  <Link {...getEventUrl(event.id)}>
    <a>
      <HoverCard card={<CalendarHoverCard eventId={event.id} />}>
        <p className={style.title} style={{ background: getEventColor(event.event_type) }}>
          {event.title}
        </p>
      </HoverCard>
    </a>
  </Link>
);

export default CalendarEventTile;
