import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { faCalendarAlt as CalendarAlt } from '@fortawesome/free-solid-svg-icons/faCalendarAlt';
import { faCalendarCheck as CalendarCheck } from '@fortawesome/free-solid-svg-icons/faCalendarCheck';
import { faMapMarkedAlt as MapMarked } from '@fortawesome/free-solid-svg-icons/faMapMarkedAlt';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';
import { INewEvent } from 'events/models/Event';
import { DateTime } from 'luxon';
import React from 'react';
import EventImage from '../EventImage';
import style from './calendar.less';

const CalendarHoverCard = ({ location, image, company_event, attendance_event, title, event_start }: INewEvent) => {
  const registrationStart =
    attendance_event && DateTime.fromISO(attendance_event.registration_start).toFormat('d MMM HH:mm');
  const eventStart = DateTime.fromISO(event_start).toFormat('d MMM HH:mm');
  return (
    <div className={style.hoverCard}>
      <EventImage image={image} companyEvents={company_event} size="sm" />
      <div>
        <h3>{title}</h3>
        <InfoTag icon={MapMarked} content={location} />
        <InfoTag icon={CalendarCheck} content={registrationStart} />
        <InfoTag icon={CalendarAlt} content={eventStart} />
      </div>
    </div>
  );
};

export interface IInfoTagProps {
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
