import Head from 'next/head';
import React, { useEffect } from 'react';

import { DOMAIN } from 'common/constants/endpoints';

import Contact from './Contact';
import style from './detail.less';
import InfoBox from './InfoBox';
import PictureCard from './PictureCard';
import Registration from './Registation';
import { useDispatch, useSelector } from 'core/redux/hooks';
import Spinner from 'common/components/Spinner';
import NotFoundPage from 'pages/404';
import { eventSelectors, fetchEventById } from 'events/slices/events';

export interface IProps {
  eventId: number;
}

export const DetailView = ({ eventId }: IProps) => {
  const dispatch = useDispatch();
  const event = useSelector((state) => eventSelectors.selectById(state, eventId))
  const isPending = useSelector((state) => state.articles.loading === 'pending');
  //const event = eventMap.get(eventId) || mockEvent;
  
  useEffect(() => {
    dispatch(fetchEventById(eventId));
  }, [eventId, dispatch])


  if (isPending && !event) {
    return <Spinner />;
  }

  if (!event) {
    return <NotFoundPage />;
  }

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
