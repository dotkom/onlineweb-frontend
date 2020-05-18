import React, { FC } from 'react';

import HoverCard from 'common/components/HoverCard';
import { getEventUrl } from 'core/appUrls';
import { Link } from 'core/components/Router';
import { getEventColor } from 'events/models/Event';

import CalendarHoverCard from './CalendarHoverCard';

import style from './CalendarEvent.less';
import { State } from 'core/redux/Store';
import { eventSelectors } from 'events/slices/events';
import { useSelector } from 'core/redux/hooks';

interface IProps {
  eventId: number;
}

export const CalendarEvent: FC<IProps> = ({ eventId }) => {
  const title = useSelector(selectEventTitle(eventId));
  const eventType = useSelector(selectEventType(eventId));
  return (
    <Link {...getEventUrl(eventId)}>
      <a>
        <HoverCard card={<CalendarHoverCard eventId={eventId} />}>
          <p className={style.title} style={{ background: getEventColor(eventType) }}>
            {title}
          </p>
        </HoverCard>
      </a>
    </Link>
  );
};

const selectEventTitle = (eventId: number) => (state: State) => {
  return eventSelectors.selectById(state, eventId)?.title || '';
};

const selectEventType = (eventId: number) => (state: State) => {
  return eventSelectors.selectById(state, eventId)?.event_type || 0;
};
