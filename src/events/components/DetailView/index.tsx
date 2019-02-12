import React, { useContext } from 'react';

import { usePrefetch } from 'common/hooks/usePrefetch';
import { PrefetchKey } from 'common/utils/PrefetchState';
import { EventsRepo } from 'events/providers/EventsRepo';

import { getEvent } from '../../api/events';
import { mockEvent } from '../../models/Event';
import ListEvent from '../ListView/ListEvent';
import Contact from './Contact';
import style from './detail.less';
import InfoBox from './InfoBox';
import PictureCard from './PictureCard';
import Registration from './Registation';

export interface IProps {
  eventId: string;
}

export const DetailView = (props: IProps) => {
  const { eventMap } = useContext(EventsRepo);
  const eventId = parseInt(props.eventId, 10);

  const prefetchEvent = usePrefetch(PrefetchKey.EVENT_SINGLE, async () => await getEvent(eventId));

  const event = prefetchEvent && prefetchEvent.id === eventId ? prefetchEvent : eventMap.get(eventId) || mockEvent;
  return (
    <div className={style.container}>
      <ListEvent {...event} />
      <PictureCard {...event} />
      <InfoBox {...event} />
      <Registration {...event} />
      <Contact {...event} />
    </div>
  );
};

export default DetailView;
