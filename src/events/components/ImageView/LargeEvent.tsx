import { faCalendarAlt, faUser } from '@fortawesome/free-regular-svg-icons/';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { DateTime } from 'luxon';
import React, { FC } from 'react';

import { getEventUrl } from 'core/appUrls';
import { Link } from 'core/components/Router';
import { useSelector } from 'core/redux/hooks';
import { getEventColor, IEvent } from 'events/models/Event';
import { selectEventCapacity } from 'events/selectors/event';

import EventImage from '../EventImage';
import style from './image.less';

export interface IProps {
  event: IEvent;
}

const LargeEvent: FC<IProps> = ({ event }) => {
  const { images, event_type, event_type_display, title, start_date, id } = event;
  const capacity = useSelector(selectEventCapacity(id));
  const color = getEventColor(event_type);
  return (
    <Link {...getEventUrl(id)}>
      <a>
        <div className={style.large}>
          <h2 className={style.imageLargeType} style={{ background: color }}>
            {event_type_display}
          </h2>
          <EventImage images={images} size="md" color={color} />
          <div className={style.largeContent}>
            <span style={{ background: color }} />
            <p>{title}</p>
            <div className={style.icon}>
              <FontAwesomeIcon icon={faCalendarAlt} fixedWidth />
            </div>
            <p className={style.suppText}>{DateTime.fromISO(start_date).toFormat('dd.MM')}</p>
            <div className={style.icon}>
              <FontAwesomeIcon icon={faUser} fixedWidth />
            </div>
            <p className={style.suppText}>{capacity}</p>
          </div>
        </div>
      </a>
    </Link>
  );
};

export default LargeEvent;
