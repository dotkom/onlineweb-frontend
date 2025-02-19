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
    <Alert validUntil={new Date('2025-02-22')}>
      <p>
      Onlinefondet har fått seg nettside! Les mer om fondet og hvordan penger deles ut på{' '}
        <a href="https://onlinefondet.no">onlinefondet.no</a>
      </p>
    </Alert>
    <EventsContainer />
    <Registrations />
    <Articles />
    <Offline issues={offlines} />
    <ForCompanies />
  </>
);

export default Frontpage;
