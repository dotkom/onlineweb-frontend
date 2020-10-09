import React, { FC, useContext } from 'react';

import { getEventUrl } from 'core/appUrls';
import { Link } from 'core/components/Router';
import { useSelector } from 'core/redux/hooks';
import { getEventColor, IEvent } from 'events/models/Event';
import { selectEventCapacity } from 'events/selectors/event';

import EventImage from '../EventImage';
import style from './netflixView.less';
import { eventSelectors } from 'events/slices/events';
import { HoveredEventContext } from '.';

interface IProps {
  eventId: number;
}

const LargeEvent: FC<IProps> = ({ eventId }) => {
  const { setHoveredEvent } = useContext(HoveredEventContext)
  const event = useSelector((state) => eventSelectors.selectById(state, eventId) as IEvent);
  const { images, event_type, event_type_display, title, start_date, id } = event;
  const capacity = useSelector(selectEventCapacity(id));
  const color = getEventColor(event_type);
  return (
    <Link {...getEventUrl(id)}>
      <a className={style.large} onMouseEnter={() => setHoveredEvent(event)} >
        <div>
          <EventImage images={images} size="wide" color={color} />
          <div className={style.largeContent}>
            <p>{title}</p>
          </div>
        </div>
      </a>
    </Link>
  );
};

export default LargeEvent;
