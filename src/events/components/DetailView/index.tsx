import Head from 'next/head';
import React, { useContext } from 'react';

import { DOMAIN } from 'common/constants/endpoints';
import { EventsRepo } from 'events/providers/EventsRepo';

import { mockEvent } from 'events/models/Event';
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

  const event = eventMap.get(eventId) || mockEvent;

  return (
    <div className={style.container}>
      <Head>
        <title>{event.title}</title>
        <meta property="og:title" content={event.title} />
        <meta property="og:description" content={event.ingress_short} />
        <meta property="og:image" content={event.image ? DOMAIN + event.image.thumb : undefined} />
      </Head>
      <div>
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
