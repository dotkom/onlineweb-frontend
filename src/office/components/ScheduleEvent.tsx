import classnames from 'classnames';
import React, { Props } from 'react';

import calendarStyle from 'events/components/CalendarView/calendar.less';
import style from './style.less';

export interface IProps extends Props<any> {
  title: string;
  color: string;
}

const ScheduleEvent = ({ title }: IProps) => {
  return (
    <p className={classnames(calendarStyle.title, style.eventColor)} title={title}>
      {title}
    </p>
  );
};

export default ScheduleEvent;
