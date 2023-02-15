import React, { FC } from 'react';

import { useSelector } from 'core/redux/hooks';
import { State } from 'core/redux/Store';

import { EventList } from '../ListView/EventList';
import { eventSelectors } from 'events/slices/events';
import { isArrayEqual } from 'common/utils/equality';

export const SearchResults: FC = () => {
  const eventIds = useSelector(selectSearchResultEventIds(), isArrayEqual());
  return <EventList eventIds={eventIds} />;
};

const selectSearchResultEventIds = () => (state: State) => {
  const resultIds = state.events.search.ids;
  const eventIds = eventSelectors.selectIds(state).map(Number);

  return resultIds.filter((id) => eventIds.includes(id));
};
