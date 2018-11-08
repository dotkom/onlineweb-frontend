import { DOMAIN } from 'common/constants/endpoints';
import IImage from 'common/models/Image';
import { getEventColor, getEventType, IAttendanceEvent, ICompanyEvent, INewEvent } from 'events/models/Event';
import { getEventAttendees } from 'events/utils/attendee';
import { DateTime } from 'luxon';
import React from 'react';
import { Link } from 'react-router-dom';
import style from './image.less';

const getEventImage = (image: IImage | null, company_event: ICompanyEvent[]) => {
  return image
    ? DOMAIN + image.wide
    : company_event[0]
    ? DOMAIN + company_event[0].company.image.wide
    : 'https://online.ntnu.no/media/images/responsive/md/86b20aca-4368-4b3a-8f10-707c747eb03f.png';
};

const LargeEvent = ({ image, event_type, title, event_start, attendance_event, id, company_event }: INewEvent) => (
  <Link to={`/events/${id}`}>
    <div className={style.large}>
      <h2 className={style.imageLargeType} style={{ background: getEventColor(event_type) }}>
        {getEventType(event_type)}
      </h2>
      <img className={style.largeImage} src={getEventImage(image, company_event)} />
      <div className={style.largeContent}>
        <p>{title}</p>
        <p>{getEventAttendees(attendance_event)}</p>
        <p>{DateTime.fromISO(event_start).toFormat('dd.MM')}</p>
      </div>
    </div>
  </Link>
);

export default LargeEvent;
