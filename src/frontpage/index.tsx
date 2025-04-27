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
    <Alert validUntil={new Date('2025-05-05')}>
      <div style={{ textAlign: 'center', display: 'block' }}>
        <p style={{ fontSize: '1.25em' }}>Meldte du deg på 17. mai frokost?</p>
        <p style={{ fontSize: '0.8em' }}>Vi tester nye nettsider, og vil gjerne ha din tilbakemelding!</p>
        <a href="https://forms.gle/cwnNamQontpTYhg48" target="_blank" rel="noopener noreferrer">
          Tilbakemeldingsskjema
        </a>
        <p style={{ fontSize: '0.8em' }}>Tusen takk, og lykke til med eksamen - Dotkom</p>
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
