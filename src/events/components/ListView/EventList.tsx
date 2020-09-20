import React, { FC } from 'react';

import { getEventUrl } from 'core/appUrls';
import { Link } from 'core/components/Router';

import { useSelector } from 'core/redux/hooks';
import { eventSelectors } from 'events/slices/events';
import style from './list.less';
import ListEvent from './ListEvent';
import { State } from 'core/redux/Store';
import { shallowEqual } from 'react-redux';

interface IProps {
  eventIds: number[];
  sortOrder?: 'ASC' | 'DESC';
}

const EventListComponent: FC<IProps> = ({ eventIds, sortOrder = 'ASC' }) => {
  const events = useSelector(selectEventsByIds(eventIds), shallowEqual);
  if (sortOrder == 'DESC') {
    events.reverse();
  }
  return (
    <div className={style.grid}>
      {events.map((event) => (
        <Link {...getEventUrl(event.id)} key={event.id}>
          <a>
            <ListEvent event={event} />
          </a>
        </Link>
      ))}
    </div>
  );
};

const selectEventsByIds = (eventIds: number[]) => (state: State) => {
  return eventSelectors.selectAll(state).filter((event) => eventIds.some((eventId) => event.id === eventId));
};

const isEventListEqual = (prevProps: IProps, nextProps: IProps) => shallowEqual(prevProps.eventIds, nextProps.eventIds);

export const EventList = React.memo(EventListComponent, isEventListEqual);
