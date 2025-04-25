import React, { useEffect } from 'react';

import { Store } from 'core/redux/Store';
import DetailView from 'events/components/DetailView';
import { eventSelectors, fetchEventById } from 'events/slices/events';
import { NextPage, NextPageContext } from 'next';

interface IContext extends NextPageContext {
  store: Store;
}

interface IProps {
  eventId: number;
}

const EventDetailPage: NextPage<IProps> = ({ eventId }) => {
  useEffect(() => {
    if (eventId === 1234) {
      window.location.href = 'https://web.online.ntnu.no/events/5049b3ef-d898-41f7-8646-d15c34c6e1bd';
    }
  }, [eventId]);
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
