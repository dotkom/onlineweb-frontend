import EventsContainer from 'events/components/EventsContainer';
import Registrations from 'events/components/Registrations/registration';
import React, { FC } from 'react';
import Articles from './components/Articles';
import ForCompanies from './components/ForCompanies';
import Offline from './components/Offline';
import { IOfflineIssue } from './models/Offline';
import Alert from './components/Alert';

interface FrontpageProps {
  offlines: IOfflineIssue[];
}

const Frontpage: FC<FrontpageProps> = ({ offlines }) => (
  <>
    <Alert validUntil={new Date('2025-08-24')}>
      <div style={{ textAlign: 'center', display: 'block' }}>
        <p>Fadderukene er i gang!</p>
        <a
          href="https://splash.online.ntnu.no/"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'inline-block',
            padding: '0.5em 1em',
            color: '#fff',
            backgroundColor: '#0d5474',
            textDecoration: 'none',
            borderRadius: '4px',
            fontSize: '0.875em',
            marginTop: '0.5em',
          }}
        >
          Gå til programmet
        </a>
      </div>
    </Alert>
    <EventsContainer />
    <Registrations />
    <Articles />
    <Offline issues={offlines} />
    <ForCompanies />
  </>
);

export default Frontpage;
