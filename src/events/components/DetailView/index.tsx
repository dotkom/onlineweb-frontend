import React, { useContext } from 'react';
import { Helmet } from 'react-helmet-async';

import { DOMAIN } from 'common/constants/endpoints';
import { usePrefetch } from 'common/hooks/usePrefetch';
import { PrefetchKey } from 'common/utils/PrefetchState';
import { EventsRepo } from 'events/providers/EventsRepo';

import { getEvent } from 'events/api/events';
import { mockEvent } from 'events/models/Event';
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
      <Helmet>
        <title>{event.title}</title>
        <meta property="og:title" content={event.title} />
        <meta property="og:description" content={event.ingress_short} />
        <meta property="og:image" content={event.image ? DOMAIN + event.image.thumb : undefined} />
      </Helmet>

      <div>
        <ListEvent {...event} />
        <PictureCard {...event} />
        <InfoBox {...event} />
      </div>
      <div>
        <Registration {...event} />
        <Contact {...event} />
      </div>
    </div>
  );
};

export default DetailView;
