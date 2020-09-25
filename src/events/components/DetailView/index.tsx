import Head from 'next/head';
import React, { useEffect } from 'react';

import Spinner from 'common/components/Spinner';
import { DOMAIN } from 'common/constants/endpoints';
import HttpError from 'core/components/errors/HttpError';
import { useDispatch, useSelector } from 'core/redux/hooks';
import { fetchAttendanceEventById } from 'events/slices/attendanceEvents';
import { eventSelectors, fetchEventById } from 'events/slices/events';

import Contact from './Contact';
import style from './detail.less';
import InfoBox from './InfoBox';
import PictureCard from './PictureCard';
import Registration from './Registation';
import { selectIsLoggedIn } from 'authentication/selectors/authentication';

interface IProps {
  eventId: number;
}

export const DetailView = ({ eventId }: IProps) => {
  const dispatch = useDispatch();
  const event = useSelector((state) => eventSelectors.selectById(state, eventId));
  const isPending = useSelector((state) => state.events.loading === 'pending');
  const isLoggedIn = useSelector(selectIsLoggedIn());

  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(fetchEventById(eventId));
    dispatch(fetchAttendanceEventById(eventId));
  }, [eventId, dispatch, isLoggedIn]);

  if (isPending && !event) {
    return <Spinner />;
  }

  if (!event) {
    return <HttpError code={404} text="Dette arrangement er ikke tilgjengelig." />;
  }

  return (
    <div className={style.container}>
      <Head>
        <title>{event.title}</title>
        <meta property="og:title" content={event.title} />
        <meta property="og:description" content={event.ingress_short} />
        <meta property="og:image" content={event.images.length ? DOMAIN + event.images[0].lg : undefined} />
        <meta property="og:article:expiration_time" content={event.end_date} />
        <meta property="og:article:tag" content={event.event_type_display} />
        <meta property="og:article:tag" content={event.location} />
      </Head>
      <div>
        <PictureCard event={event} />
        <InfoBox event={event} />
      </div>
      <div>
        <Registration event={event} />
        <Contact event={event} />
      </div>
    </div>
  );
};

export default DetailView;
