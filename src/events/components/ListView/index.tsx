import React, { useContext, useEffect } from 'react';

import { Link } from 'core/components/Router';
import { getListEvents } from 'events/api/listEvents';
import { useDebouncedFilteredEventList } from 'events/hooks/useEventsRepoState';
import { EventsRepo } from 'events/providers/EventsRepo';
import { isOngoingOrFuture } from 'events/utils/eventTimeUtils';

import { IEvent, IEventViewProps } from '../../models/Event';
import style from './list.less';
import ListEvent from './ListEvent';

export interface IProps extends IEventViewProps {
  filtered: boolean;
}

const filterListEvents = (events: IEvent[]) => {
  return events.filter((event) => isOngoingOrFuture(event)).slice(0, 18);
};

export const ListView = ({ filtered }: IProps) => {
  const { eventList, updateEventList } = useContext(EventsRepo);
  const filteredList = useDebouncedFilteredEventList();

  useEffect(() => {
    (async () => {
      const newEvents = await getListEvents();
      updateEventList(newEvents);
    })();
  }, []);

  const events = filtered ? filteredList : filterListEvents(eventList);

  const displayEvents = events.length ? events : [];

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
