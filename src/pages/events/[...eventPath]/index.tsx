import React from 'react';

import { Store } from 'core/redux/Store';
import DetailView from 'events/components/DetailView';
import { eventSelectors, fetchEventById } from 'events/slices/events';
import { NextPage, NextPageContext } from 'next';

interface IContext extends NextPageContext {
  store: Store;
}

interface IProps {
  eventPath: string[];
}

/*
This index is lower priority than the ones in [eventId].
This one will be hit for urls other than:
  /event/[number], 
  /event/[number]/public-attendees
  
This is to allow for django-styled URL matches from the absolute_url field of the API.
*/

const EventDetailPage: NextPage<IProps> = ({ eventPath }) => {
  const eventId = Number(eventPath[0]); // Path matches is [id, event-name].
  return <DetailView eventId={eventId} />;
};

EventDetailPage.getInitialProps = async ({ query, store }: IContext) => {
  const eventPath = Array.isArray(query.eventPath) ? query.eventPath : [];
  const eventIdAsString = eventPath && eventPath[0];
  const eventId = Number(eventIdAsString);
  const isEventInStore = Boolean(eventSelectors.selectById(store.getState(), eventId));
  const result = store.dispatch(fetchEventById(eventId));
  if (!isEventInStore) {
    await result;
  }
  return { eventPath };
};

export default EventDetailPage;
