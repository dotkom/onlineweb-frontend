import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { faCalendarAlt as CalendarAlt } from '@fortawesome/free-regular-svg-icons/faCalendarAlt';
import { faCalendarCheck as CalendarCheck } from '@fortawesome/free-regular-svg-icons/faCalendarCheck';
import { faMapMarkedAlt as MapMarked } from '@fortawesome/free-solid-svg-icons/faMapMarkedAlt';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';
import { DateTime } from 'luxon';
import React, { FC } from 'react';

import { useSelector } from 'core/redux/hooks';
import { State } from 'core/redux/Store';
import { IEvent } from 'events/models/Event';
import { attendanceEventSelectors } from 'events/slices/attendanceEvents';
import { eventSelectors } from 'events/slices/events';

import EventImage from '../EventImage';
import style from './CalendarHoverCard.less';

interface IProps {
  eventId: number;
}

const CalendarHoverCard: FC<IProps> = ({ eventId }) => {
  const event = useSelector((state) => eventSelectors.selectById(state, eventId) as IEvent);
  const { location, images, title, start_date } = event;
  const registrationStart = useSelector(selectRegistrationStart(eventId));
  const eventStart = DateTime.fromISO(start_date).toFormat('d MMM HH:mm');
  return (
    <div className={style.hoverCard}>
      <EventImage images={images} size="sm" />
      <div>
        <h3>{title}</h3>
        <InfoTag icon={MapMarked} content={location} />
        <InfoTag icon={CalendarCheck} content={registrationStart} />
        <InfoTag icon={CalendarAlt} content={eventStart} />
      </div>
    </div>
  );
};

const selectRegistrationStart = (eventId: number) => (state: State) => {
  const attendanceEvent = attendanceEventSelectors.selectById(state, eventId);
  if (attendanceEvent) {
    return DateTime.fromISO(attendanceEvent.registration_start).toFormat('d MMM HH:mm');
  } else {
    return null;
  }
};

interface IInfoTagProps {
  icon: IconProp;
  content: string | null;
}

const InfoTag = ({ icon, content }: IInfoTagProps) => (
  <>
    {content ? (
      <div className={style.infoTag}>
        <Icon icon={icon} fixedWidth />
        {content}
      </div>
    ) : null}
  </>
);

export default CalendarHoverCard;
