import classnames from 'classnames';
import React from 'react';

import { ICalendarItem } from 'common/utils/api/google/models/calendar';
import style from 'events/components/CalendarView/calendar.less';
import ScheduleEvent from './ScheduleEvent';

export interface IProps {
  events: ICalendarItem[];
  active?: boolean;
  day: number;
}

const ScheduleTile = ({ events, active = true, day }: IProps) => {
  return (
    <div
      className={classnames(style.tile, {
        [style.tileInactive]: !active,
      })}
    >
      <div className={style.tileContent}>
        <p>{day}</p>
        {events.map((event) => (
          <ScheduleEvent key={event.id} title={event.summary} color={event.kind} />
        ))}
      </div>
    </div>
  );
};

export default ScheduleTile;
