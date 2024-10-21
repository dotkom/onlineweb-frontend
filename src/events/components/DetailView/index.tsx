import React from 'react';
import Head from 'next/head';
import { useEffect } from 'react';

import Spinner from 'common/components/Spinner';
import { DOMAIN } from 'common/constants/endpoints';
import HttpError from 'core/components/errors/HttpError';
import { useDispatch, useSelector } from 'core/redux/hooks';
import { fetchAttendanceEventById, setAttendanceEventFromLocalStorage } from 'events/slices/attendanceEvents';
import { fetchEventById, setEventFromLocalStorage } from 'events/slices/events';

import { IAttendanceEvent, IEvent } from 'events/models/Event';
import Contact from './Contact';
import InfoBox from './InfoBox';
import PictureCard from './PictureCard';
import Registration from './Registation';
import style from './detail.less';

interface IProps {
  eventId: number;
}

export const getAttendanceEventLSKey = (eventId: number) => `attendanceevent-${eventId}`;
export const getEventLSKey = (eventId: number) => `event-${eventId}`;

export interface ObjectInLocalStorage<T> {
  validTo: number;
  data: T;
}

const useFetchEvent = (eventId: number) => {
  const dispatch = useDispatch();
  // see if event in localStorage
  const eventStr = localStorage.getItem(getEventLSKey(eventId));
  let event: ObjectInLocalStorage<IEvent> | null = null;

  useEffect(() => {
    if (!eventStr) {
      dispatch(fetchEventById(eventId));
    } else {
      if (eventStr) {
        event = JSON.parse(eventStr) as ObjectInLocalStorage<IEvent>;

        if (event.validTo < Date.now()) {
          dispatch(fetchEventById(eventId));
          return;
        }

        dispatch(setEventFromLocalStorage(event.data));
      }
    }
  }, [eventId, dispatch]);

  return event;
};

const useFetchAttendanceEvent = (eventId: number) => {
  const dispatch = useDispatch();
  // see if event in localStorage
  const eventStr = localStorage.getItem(getAttendanceEventLSKey(eventId));
  let event: ObjectInLocalStorage<IAttendanceEvent> | null = null;

  useEffect(() => {
    if (!eventStr) {
      dispatch(fetchAttendanceEventById(eventId));
    } else {
      if (eventStr) {
        event = JSON.parse(eventStr) as ObjectInLocalStorage<IAttendanceEvent>;

        if (event.validTo < Date.now()) {
          dispatch(fetchAttendanceEventById(eventId));
          return;
        }

        dispatch(setAttendanceEventFromLocalStorage(event.data));
      }
    }
  }, [eventId, dispatch]);
  return event;
};

export const DetailView = ({ eventId }: IProps) => {
  const dispatch = useDispatch();
  const event = useSelector((state) => state.events.entities[eventId]);
  const isPending = useSelector((state) => state.events.loading === 'pending');

  useFetchEvent(eventId);
  useFetchAttendanceEvent(eventId);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [eventId, dispatch]);

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
