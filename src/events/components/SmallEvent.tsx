import React from 'react';
//import moment from 'moment';
import luxon, { DateTime } from 'luxon';

export interface ISmallEventProps {
  eventUrl: string
  startDate: string
  title: string
}

const SmallEvent = ({ eventUrl, startDate, title }: ISmallEventProps) => (
  <li>
    <span>
      {DateTime.fromISO(startDate).toFormat('dd. LLL')}
    </span>
    <a href={eventUrl}>
      {title}
    </a>
  </li>
);

export default SmallEvent;
