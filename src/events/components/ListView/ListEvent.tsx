import { faCalendarAlt, faUser } from '@fortawesome/free-regular-svg-icons/';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { DateTime } from 'luxon';
import React, { FC } from 'react';
import { getEventColor, IEvent } from '../../models/Event';
import style from './list.less';

interface IProps {
  event: IEvent;
}

const ListEvent: FC<IProps> = ({ event }) => {
  const { title, start_date, event_type, event_type_display } = event;
  const eventColor = getEventColor(event_type);
  const eventDateTime = DateTime.fromISO(start_date);
  const eventDate =
    eventDateTime.year < new Date().getFullYear() || eventDateTime.year > new Date().getFullYear()
      ? eventDateTime.toFormat('dd.MM.yyyy')
      : eventDateTime.toFormat('dd.MM');
  const eventAttendees = 'ALLE';

  return (
    <div className={style.gridRow}>
      <div className={style.eventTypeDiv}>
        <span style={{ background: eventColor }} />
        <p className={style.eventType} style={{ color: eventColor }}>
          {event_type_display}
        </p>
      </div>
      <p className={style.eventTitle}>{title}</p>
      <div className={style.icon}>
        <FontAwesomeIcon icon={faCalendarAlt} fixedWidth />
      </div>
      <p> {eventDate} </p>
      <div className={style.icon}>
        <FontAwesomeIcon icon={faUser} fixedWidth />
      </div>
      <p> {eventAttendees} </p>
    </div>
  );
};

export default ListEvent;
