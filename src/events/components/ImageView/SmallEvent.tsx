import { faCalendarAlt, faUser } from '@fortawesome/free-regular-svg-icons/';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { DateTime } from 'luxon';
import React, { FC } from 'react';

import { getEventUrl } from 'core/appUrls';
import { Link } from 'core/components/Router';
import { useSelector } from 'core/redux/hooks';
import { getEventColor, IEvent } from 'events/models/Event';
import { selectEventCapacity } from 'events/selectors/event';
import { eventSelectors } from 'events/slices/events';

import style from './image.less';

interface IProps {
  eventId: number;
}

export const SmallEvent: FC<IProps> = ({ eventId }) => {
  const event = useSelector((state) => eventSelectors.selectById(state, eventId) as IEvent);
  const capacity = useSelector(selectEventCapacity(event.id));
  return (
    <Link {...getEventUrl(event.id)}>
      <a>
        <div className={style.small}>
          <span style={{ background: getEventColor(event.event_type) }} />
          <p>{event.title}</p>
          <div className={style.icon}>
            <FontAwesomeIcon icon={faCalendarAlt} fixedWidth />
          </div>
          <p className={style.suppText}> {DateTime.fromISO(event.start_date).toFormat('dd.MM')} </p>
          <div className={style.icon}>
            <FontAwesomeIcon icon={faUser} fixedWidth />
          </div>
          <p className={style.suppText}>{capacity}</p>
        </div>
      </a>
    </Link>
  );
};

export default SmallEvent;
