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
    if (eventId === 2516) {
      window.location.href = 'https://web.online.ntnu.no/events/17._mai_frokost/b317ec9b-d073-4f0d-9f9d-2b39d2759a27';
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
