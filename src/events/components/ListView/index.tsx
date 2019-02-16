import React, { useContext, useEffect } from 'react';

import { usePrefetch } from 'common/hooks/usePrefetch';
import { PrefetchKey } from 'common/utils/PrefetchState';
import { Link } from 'core/components/Router';
import { getListEvents } from 'events/api/listEvents';
import { EventsRepo } from 'events/providers/EventsRepo';
import { isOngoingOrFuture } from 'events/utils/isOngoing';

import { IEventViewProps, INewEvent } from '../../models/Event';
import style from './list.less';
import ListEvent from './ListEvent';

export type IProps = IEventViewProps;

const filterListEvents = (events: INewEvent[]) => {
  return events.filter((event) => isOngoingOrFuture(event)).slice(0, 7);
};

export const ListView = ({  }: IProps) => {
  const { eventList, updateEventList } = useContext(EventsRepo);

  const prefetch = usePrefetch(PrefetchKey.EVENTS_LIST, async () => {
    const prefetchedEvents = await getListEvents();
    return filterListEvents(prefetchedEvents);
  });

  useEffect(() => {
    (async () => {
      const newEvents = await getListEvents();
      updateEventList(newEvents);
    })();
  }, []);

  const events = filterListEvents(eventList);

  const displayEvents = events.length ? events : prefetch || [];

  return (
    <>
      <div className={style.grid}>
        {displayEvents.map((event) => (
          <Link to={`/events/${event.id}`} key={event.id}>
            <ListEvent {...event} />
          </Link>
        ))}
      </div>
    </>
  );
};

export default ListView;
