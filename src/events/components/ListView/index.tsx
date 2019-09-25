import React, { useContext, useEffect } from 'react';

import { usePrefetch } from 'common/hooks/usePrefetch';
import { PrefetchKey } from 'common/utils/PrefetchState';
import { Link } from 'core/components/Router';
import { getListEvents } from 'events/api/listEvents';
import { useDebouncedFilteredEventList } from 'events/hooks/useEventsRepoState';
import { EventsRepo } from 'events/providers/EventsRepo';
import { isOngoingOrFuture } from 'events/utils/eventTimeUtils';
import { EventTypeEnum, IEvent, IEventViewProps } from '../../models/Event';
import style from './list.less';
import ListEvent from './ListEvent';
import ListEventPlaceholder from './ListEventPlaceholder';

export interface IProps extends IEventViewProps {
  filtered: boolean;
}

const filterListEvents = (events: IEvent[]) => {
  return events.filter((event) => isOngoingOrFuture(event)).slice(0, 7);
};

export const ListView = ({ filtered }: IProps) => {
  const { eventList, updateEventList } = useContext(EventsRepo);
  const filteredList = useDebouncedFilteredEventList();

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

  const events = filtered ? filteredList : filterListEvents(eventList);

  const displayEvents = events.length ? events : prefetch || [];

  return (
    <>
      {eventList[0] ? (
        <div className={style.grid}>
          {displayEvents.map((event) => (
            <Link to={`/events/${event.id}`} key={event.id}>
              <ListEvent {...event} />
            </Link>
          ))}
        </div>
      ) : (
        <div className={style.grid}>
          <ListEventPlaceholder eventType={EventTypeEnum.BEDPRES} />
          <ListEventPlaceholder eventType={EventTypeEnum.SOSIALT} />
          <ListEventPlaceholder eventType={EventTypeEnum.KURS} />
        </div>
      )}
    </>
  );
};

export default ListView;
