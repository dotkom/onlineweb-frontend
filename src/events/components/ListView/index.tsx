import React, { useEffect, FC } from 'react';

import { useDispatch, useSelector } from 'core/redux/hooks';
import { eventSelectors, fetchEventList } from 'events/slices/events';

import { EventList } from './EventList';
import { State } from 'core/redux/Store';
import { DateTime } from 'luxon';
import { shallowEqual } from 'react-redux';

export const ListView: FC = () => {
  const dispatch = useDispatch();
  const eventIds = useSelector(selectFutureEventIds(), shallowEqual);

  useEffect(() => {
    dispatch(fetchEventList());
  }, []);

  return <EventList eventIds={eventIds} sortOrder="DESC" />;
};

const selectFutureEventIds = () => (state: State) => {
  const now = DateTime.local();
  const events = eventSelectors.selectAll(state)
  .filter((event) => DateTime.fromISO(event.start_date) > now)
  .sort((a, b) => DateTime.fromISO(a.start_date).diff(DateTime.fromISO(b.start_date)).milliseconds); 
  const firstN = events.slice(0,30).reverse(); // 30 next events
  return firstN.map((event) => event.id);
};

export default ListView;
