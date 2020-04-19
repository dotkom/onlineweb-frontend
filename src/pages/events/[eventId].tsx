import React from 'react';

import { Store } from 'core/redux/Store';
import DetailView from 'events/components/DetailView';
import { eventSelectors, fetchEventById } from 'events/slices/events';
import { NextPageContext, NextPage } from 'next';

interface IContext extends NextPageContext {
  store: Store;
}

interface IProps {
  eventId: number;
}

const EventDetailPage: NextPage<IProps> = ({ eventId }) => {
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
