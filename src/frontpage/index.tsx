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
    <Alert validUntil={new Date('2025-04-09')}>
      <div style={{ textAlign: 'center', display: 'block' }}>
        <p>Vil du bli fadder i høst? Meld deg på her:</p>
        <a href="https://forms.gle/2D4Uq9i7PgFHdkWHA">Bachelor</a>
        <span style={{ margin: '0 1ch' }}>•</span>
        <a href="https://forms.gle/XrXZ1P8GmexX88JR9">Master</a>
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
