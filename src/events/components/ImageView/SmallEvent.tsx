import { faCalendarAlt, faUser } from '@fortawesome/free-regular-svg-icons/';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { DateTime } from 'luxon';
import React from 'react';

import { getEventUrl } from 'core/appUrls';
import { Link } from 'core/components/Router';
import { getEventColor, IEvent } from 'events/models/Event';

import style from './image.less';

const SmallEvent = ({ title, event_type, start_date, id }: IEvent) => (
  <Link {...getEventUrl(id)}>
    <a>
      <div className={style.small}>
        <span style={{ background: getEventColor(event_type) }} />
        <p>{title}</p>
        <div className={style.icon}>
          <FontAwesomeIcon icon={faCalendarAlt} fixedWidth />
        </div>
        <p className={style.suppText}> {DateTime.fromISO(start_date).toFormat('dd.MM')} </p>
        <div className={style.icon}>
          <FontAwesomeIcon icon={faUser} fixedWidth />
        </div>
        <p className={style.suppText}>ALLE</p>
      </div>
    </a>
  </Link>
);

const SmallEventColumn = ({ events }: { events: IEvent[] }) => {
  return (
    <>
      {events.map((event) => (
        <SmallEvent key={event.id} {...event} />
      ))}
    </>
  );
};

export default SmallEventColumn;
