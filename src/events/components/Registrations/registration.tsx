import React, { FC, useEffect, useState } from 'react';

import { listEvents } from '../../api/events';
import { IEvent } from '../../models/Event';

import { faCalendarAlt, faUser } from '@fortawesome/free-regular-svg-icons/';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { DateTime } from 'luxon';

import { getEventUrl } from 'core/appUrls';
import { Link } from 'core/components/Router';
import { getEventColor } from 'events/models/Event';

import style from './styles.less';

interface IProps {
  event: IEvent;
}

function timeLeftUntilRegistrationStart(date: string) {
  const start = DateTime.fromISO(date);
  const now = DateTime.local();
  const diff = start.diff(now, ['days', 'hours', 'minutes']);

  if (diff.days < 0) {
    return `i dag ${start.toFormat('HH:mm')}`;
  }

  const days = ['man', 'tir', 'ons', 'tor', 'fre', 'lør', 'søn'][start.weekday - 1];

  return `${days} ${start.toFormat('HH:mm')}`;
}

function timeLeftUntilRegistrationEnd(date: string) {
  const end = DateTime.fromISO(date);
  const diff = end.diff(DateTime.local(), ['days', 'hours', 'minutes']);

  if (diff.days < 0) {
    return `i dag ${end.toFormat('HH:mm')}`;
  }

  const days = ['man', 'tir', 'ons', 'tor', 'fre', 'lør', 'søn'][end.weekday - 1];

  return `${days} ${end.toFormat('HH:mm')}`;
}

const Registration: FC<IProps> = ({ event }) => {
  const capacity = `${event.number_of_seats_taken}/${event.max_capacity}`;
  const registrationStart = DateTime.fromISO(event.registration_start);
  const now = DateTime.local();

  const registrationText =
    registrationStart > now
      ? `Påmelding åpner <b>${timeLeftUntilRegistrationStart(event.registration_start)}</b>`
      : `Påmelding stenger <b>${timeLeftUntilRegistrationEnd(event.registration_end)}</b>`;

  return (
    <Link {...getEventUrl(event.id)}>
      <a>
        <div className={style.small}>
          <span style={{ background: getEventColor(event.event_type) }} />
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <p>{event.title}</p>
            <p dangerouslySetInnerHTML={{ __html: registrationText }} />
          </div>
          <div className={style.icon}>
            <FontAwesomeIcon icon={faCalendarAlt} fixedWidth />
          </div>
          <p className={style.suppText}> {DateTime.fromISO(event.start_date).toFormat('dd.MM')} </p>
          <div className={style.icon}>
            <FontAwesomeIcon icon={faUser} fixedWidth />
          </div>
          <p className={style.suppText}>{capacity}</p>
        </div>
      </a>
    </Link>
  );
};

export const Registrations: FC = () => {
  const [events, setEvents] = useState<IEvent[]>([]);

  useEffect(() => {
    async function fetchUpcomingRegistrations() {
      const response = await listEvents({
        ordering: 'attendance_event__registration_end',
        page_size: 10,
        registration_end__gte: DateTime.local().toISODate(),
        registration_start__lte: DateTime.local()
          .plus({ days: 8 })
          .toISODate(),
      });
      if (response.status === 'success') {
        setEvents(response.data.results);
        return;
      }

      console.log(response.errors);
      return [];
    }

    fetchUpcomingRegistrations();
  }, []);

  function eventsWithOpenRegistration(events: IEvent[]) {
    return events.filter((event) => {
      return (
        DateTime.fromISO(event.registration_start) < DateTime.local() &&
        DateTime.fromISO(event.registration_end) > DateTime.local()
      );
    });
  }

  function eventsWithRegistrationNotStarted(events: IEvent[]) {
    return events.filter((event) => {
      return DateTime.fromISO(event.registration_start) > DateTime.local();
    });
  }

  return (
    <section style={{ width: '100%', marginTop: '2rem' }}>
      <h3>Påmeldinger</h3>
      <div className={style.registrationContainer}>
        <div>
          {eventsWithOpenRegistration(events).length > 0 ? (
            <div>
              <h4 style={{ marginBottom: '0.5rem' }}>Åpne</h4>
              <div className={style.eventColumn}>
                {eventsWithOpenRegistration(events).map((event) => (
                  <Registration event={event} key={event.id} />
                ))}
              </div>
            </div>
          ) : (
            <div>Ingen åpne påmeldinger</div>
          )}
        </div>
        <div>
          {eventsWithRegistrationNotStarted(events).length > 0 ? (
            <div className={style.eventColumn}>
              <h4 style={{ marginBottom: '0.5rem' }}>Åpner snart</h4>
              {eventsWithRegistrationNotStarted(events).map((event) => (
                <Registration event={event} key={event.id} />
              ))}
            </div>
          ) : (
            <div>Ingen kommende påmeldinger neste uke</div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Registrations;
