import Link from 'next/link';
import React, { FC } from 'react';

import HoverCard from 'common/components/HoverCard';
import { getEventUrl } from 'core/appUrls';
import { IEvent, getEventColor } from 'events/models/Event';

import CalendarHoverCard from './CalendarHoverCard';

import style from './CalendarEvent.less';

interface IProps {
  event: IEvent;
}

export const CalendarEvent: FC<IProps> = ({ event }) => {
  return (
    <Link {...getEventUrl(event.id)}>
      <a>
        <HoverCard card={<CalendarHoverCard eventId={event.id} />}>
          <p className={style.title} style={{ background: getEventColor(event.event_type) }}>
            {event.title}
          </p>
        </HoverCard>
      </a>
    </Link>
  );
};
