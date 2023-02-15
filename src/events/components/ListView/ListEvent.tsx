import { faCalendarAlt, faUser } from '@fortawesome/free-regular-svg-icons/';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { DateTime } from 'luxon';
import React, { FC } from 'react';

import { useSelector } from 'core/redux/hooks';
import { selectEventCapacity } from 'events/selectors/event';

import { getEventColor, IEvent } from '../../models/Event';
import style from './list.less';
import classNames from 'classnames';

interface IProps {
  event: IEvent;
  isOutdated: boolean;
}

const ListEvent: FC<IProps> = ({ event, isOutdated }) => {
  const {
    title,
    start_date,
    event_type,
    event_type_display,
    number_of_seats_taken,
    max_capacity,
    waitlist,
    attendee_info,
  } = event;

  const { is_attendee, is_on_waitlist, is_eligible_for_signup } = attendee_info ?? {};

  const capacity = useSelector(selectEventCapacity(event.id));
  const eventDateTime = DateTime.fromISO(start_date);

  const eventColor = getEventColor(event_type);

  let pingColor;
  let tooltipText;
  const animationActive = false; // Don't ask

  if (is_on_waitlist) {
    pingColor = '#FFA500';
    tooltipText = 'Du er på ventelisten';
  } else if (is_attendee) {
    pingColor = '#17c717';
    tooltipText = 'Du er påmeldt';
  } else if (is_eligible_for_signup?.status || is_attendee) {
    if ((number_of_seats_taken ?? -1) < (max_capacity ?? -2)) {
      pingColor = '#17c717';
      tooltipText = 'Påmelding åpen';
    } else {
      if (waitlist) {
        pingColor = '#FFA500';
        tooltipText = 'Venteliste åpen';
      }
    }
  }

  let registrationStatusElement;
  if (pingColor && !is_attendee) {
    registrationStatusElement = (
      <div className={style.eventRegistrationStatus} title={tooltipText}>
        <span
          className={classNames({ [style.animationPing]: animationActive })}
          style={{ backgroundColor: pingColor }}
        ></span>
        <span style={{ backgroundColor: pingColor }}></span>
      </div>
    );
  } else if (is_attendee) {
    registrationStatusElement = (
      <div className={style.isRegistered} title={tooltipText}>
        <FontAwesomeIcon icon={faCheck} style={{ color: pingColor }} fixedWidth />
      </div>
    );
  }

  const eventDate =
    eventDateTime.year < new Date().getFullYear() || eventDateTime.year > new Date().getFullYear()
      ? eventDateTime.toFormat('dd.MM.yyyy')
      : eventDateTime.toFormat('dd.MM');

  return (
    <div className={classNames(style.gridRow, { [style.grayedOutGridRow]: isOutdated })}>
      <div className={style.eventTypeDiv}>
        <span style={{ background: eventColor }} />
        <p className={style.eventType}>{event_type_display}</p>
      </div>
      <p className={style.eventTitle}>{title}</p>
      <div className={style.icon}>
        <FontAwesomeIcon icon={faCalendarAlt} fixedWidth />
      </div>
      <p> {eventDate} </p>
      <div className={style.icon}>
        <FontAwesomeIcon icon={faUser} fixedWidth />
      </div>
      <p> {capacity} </p>
      {registrationStatusElement}
    </div>
  );
};

export default ListEvent;
