import { IEvent } from 'events/models/Event';
import React, { useState } from 'react';
import styles from './detail.less';
import axios from 'axios';
import Select from '@dotkomonline/design-system/dist/components/select/Select';
import Link from 'next/link';

interface ExportDropdownProps {
  event: IEvent;
}

interface IGoogleCalendarInsertEvent {
  end: {
    dateTime: Date;
  };
  start: {
    dateTime: Date;
  };
}

const ExportDropdown = ({ event }: ExportDropdownProps) => {
  // State management
  const [iCalHref, setICalHref] = useState('');

  // Check the NODE_ENV, and determine if we're in development or production.
  const isDevelopment = process.env.NODE_ENV !== 'production';

  // Build calendarUrl based on the NODE_ENV
  const iCalUrl = isDevelopment
    ? `localhost:8000/api/v1/event/events/${event.id}/calendar`
    : `https://online.ntnu.no/api/v1/event/events/${event.id}/calendar`;

  const handleICal = () => {
    const response = axios({
      url: iCalUrl,
      method: 'GET', // !: Maybe this should be POST, we'll see
      responseType: 'blob', // Specifying that this is a binary large object is important when a file is downloaded from endpoint
    })
      .then((response) => {
        const url = URL.createObjectURL(new Blob([response.data]));
        setICalHref(url);
      })
      .catch((error) => {
        // TODO: Proper error handling
        console.log(`❌ An error occurred: ${error.message}`);
      });
  };

  const handleGoogleCalendar = () => {
    const requestBody: IGoogleCalendarInsertEvent = {
      start: {
        dateTime: new Date(event.start_date),
      },
      end: {
        dateTime: new Date(event.end_date),
      },
    };

    const response = axios
      .post(`https://www.googleapis.com/calendar/v3/calendars/${event.id}/events`, requestBody)
      .then((response) => {
        // TODO: Proper handling
        console.log(response);
      })
      .catch((error) => {
        // TODO: Proper  error handling
        console.error(error);
      });
  };

  return (
    <div className={styles.export}>
      <Select>
        <option value="{iCal}" onClick={handleICal}>
          <Link href={iCalHref}>iCal</Link>
        </option>
        <option value="{Google Calendar}" onClick={handleGoogleCalendar}>
          Google Calendar
        </option>
      </Select>
    </div>
  );
};

export default ExportDropdown;
