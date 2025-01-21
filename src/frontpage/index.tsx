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
    <Alert validUntil={new Date('2025-01-27')}>
      <p>
        Opptak til Velkom, Backlog, Ekskom, Jubkom og Karrieredagene har nå åpnet! Les mer på{' '}
        <a href="https://opptak.online.ntnu.no/">opptakssiden</a>
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
