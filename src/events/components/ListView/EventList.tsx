import React, { FC } from 'react';

import { getEventUrl } from 'core/appUrls';
import { Link } from 'core/components/Router';

import { useSelector } from 'core/redux/hooks';
import { eventSelectors } from 'events/slices/events';
import style from './list.less';
import ListEvent from './ListEvent';
import { State } from 'core/redux/Store';
import { shallowEqual } from 'react-redux';
import { DateTime } from 'luxon';
import { IEvent } from 'events/models/Event';
import classNames from 'classnames';

interface IProps {
  eventIds: number[];
  sortOrder?: 'ASC' | 'DESC';
}

const EventListComponent: FC<IProps> = ({ eventIds, sortOrder = 'ASC' }) => {
  const events = useSelector(selectEventsByIds(eventIds), shallowEqual);
  if (sortOrder == 'DESC') {
    events.reverse();
  }

  const isOutdatedEvent = (ev: IEvent) => {
    return DateTime.fromJSDate(new Date()) > DateTime.fromISO(ev.end_date);
  };

  return (
    <div className={style.grid}>
      {events.map((event) => {
        const isOutdated = isOutdatedEvent(event);
        return (
          <Link {...getEventUrl(event.id)} key={event.id}>
            <a className={classNames({ [style.outdatedLink]: isOutdated })}>
              <ListEvent event={event} isOutdated={isOutdated} />
            </a>
          </Link>
        );
      })}
    </div>
  );
};

const selectEventsByIds = (eventIds: number[]) => (state: State) => {
  return eventIds.map((id) => eventSelectors.selectById(state, id)).filter((event) => event !== undefined) as IEvent[];
};

const isEventListEqual = (prevProps: IProps, nextProps: IProps) => shallowEqual(prevProps.eventIds, nextProps.eventIds);

export const EventList = React.memo(EventListComponent, isEventListEqual);
