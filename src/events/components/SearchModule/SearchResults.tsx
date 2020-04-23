import React, { FC } from 'react';

import { useSelector } from 'core/redux/hooks';
import { State } from 'core/redux/Store';

import { EventList } from '../ListView/EventList';
import { eventSelectors } from 'events/slices/events';
import { isArrayEqual } from 'common/utils/equality';

export const SearchResults: FC = () => {
  const eventIds = useSelector(selectSearchResultEventIds(), isArrayEqual());
  const isPending = useSelector(selectIsSearchPending());
  const count = useSelector(selectSearchCount());
  return (
    <>
      <div>
        <p>Antall resultater: {count}</p>
        <p>{isPending && 'Søker...'}</p>
      </div>
      <EventList eventIds={eventIds} />
    </>
  );
};

const selectSearchResultEventIds = () => (state: State) => {
  const resultIds = state.events.search.ids;
  return eventSelectors
    .selectIds(state)
    .map(Number)
    .filter((eventId) => resultIds.some((resultId) => resultId === eventId));
};

const selectIsSearchPending = () => (state: State) => {
  return state.events.search.loading === 'pending';
};

const selectSearchCount = () => (state: State) => {
  return state.events.search.count;
};
