import React, { useEffect } from 'react';

import { getEventUrl } from 'core/appUrls';
import { Link } from 'core/components/Router';
import { useDebouncedFilteredEventList } from 'events/hooks/useEventsRepoState';
import { isOngoingOrFuture } from 'events/utils/eventTimeUtils';

import { IEvent, IEventViewProps } from '../../models/Event';
import style from './list.less';
import ListEvent from './ListEvent';
import { useDispatch, useSelector } from 'core/redux/hooks';
import { fetchEventList, eventSelectors } from 'events/slices/events';

export interface IProps extends IEventViewProps {
  filtered: boolean;
}

const filterListEvents = (events: IEvent[]) => {
  return events.filter((event) => isOngoingOrFuture(event)).slice(0, 18);
};

export const ListView = ({ filtered }: IProps) => {
  const dispatch = useDispatch();
  const eventList = useSelector((state) => eventSelectors.selectAll(state));
  const filteredList = useDebouncedFilteredEventList();

  useEffect(() => {
    dispatch(fetchEventList());
  }, []);

  const events = filtered ? filteredList : filterListEvents(eventList);

  const displayEvents = events.length ? events : [];

  return (
    <>
      <div className={style.grid}>
        {displayEvents.map((event) => (
          <Link {...getEventUrl(event.id)} key={event.id}>
            <a>
              <ListEvent {...event} />
            </a>
          </Link>
        ))}
      </div>
    </>
  );
};

export default ListView;
