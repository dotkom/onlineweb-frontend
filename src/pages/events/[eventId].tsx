import { useRouter } from 'next/router';
import React from 'react';

import { Store } from 'core/redux/Store';
import DetailView from 'events/components/DetailView';
import { eventSelectors, fetchEventById } from 'events/slices/events';
import { NextPageContext } from 'next';

interface IContext extends NextPageContext {
  store: Store;
}

const EventDetailPage = () => {
  const router = useRouter();
  const eventId = Number(router.query.eventId);
  return <DetailView eventId={eventId} />;
};

EventDetailPage.getInitialProps = async ({ query, store }: IContext) => {
  const eventId = Number(query.eventId);
  const isEventInStore = Boolean(eventSelectors.selectById(store.getState(), eventId));
  const result = store.dispatch(fetchEventById(eventId));
  if (!isEventInStore) {
    await result;
  }
  return { eventId };
};

export default EventDetailPage;
