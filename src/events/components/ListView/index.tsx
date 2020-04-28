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

  return <EventList eventIds={eventIds} />;
};

const selectFutureEventIds = () => (state: State) => {
  const now = DateTime.local();
  const events = eventSelectors.selectAll(state);
  return events
    .filter((event) => DateTime.fromISO(event.start_date) > now)
    .slice(0, 20)
    .map((event) => event.id);
};

export default ListView;
