import classNames from 'classnames';
import { DateTime } from 'luxon';
import React, { FC } from 'react';

import { eventSelectors } from 'events/slices/events';
import { useSelector } from 'core/redux/hooks';
import { State } from 'core/redux/Store';

import { CalendarEvent } from './CalendarEvent';
import style from './CalendarTile.less';

interface IProps {
  active: boolean;
  date: DateTime;
}

export const EventCalendarTile: FC<IProps> = ({ date, active }) => {
  const events = useSelector(selectEventsForDate(date));
  return (
    <div
      className={classNames(style.tile, {
        [style.tileInactive]: !active,
      })}
    >
      <div className={style.tileContent}>
        <p>{date.day}</p>
        {events.map((event) => (
          <CalendarEvent key={event.id} event={event} />
        ))}
      </div>
    </div>
  );
};

const isSameDate = (dateA: DateTime, dateB: DateTime): boolean => {
  return dateA.toISODate() === dateB.toISODate();
};

const selectEventsForDate = (date: DateTime) => (state: State) => {
  return eventSelectors
    .selectAll(state)
    .filter((event) => isSameDate(date, DateTime.fromISO(event.start_date)))
    .sort((eventA, eventB) => eventA.start_date.localeCompare(eventB.start_date));
};

export default EventCalendarTile;
