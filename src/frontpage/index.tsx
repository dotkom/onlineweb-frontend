import EventsContainer from 'events/components/EventsContainer';
import React, { FC } from 'react';
import Articles from './components/Articles';
import ForCompanies from './components/ForCompanies';
import Offline from './components/Offline';
import { IOfflineIssue } from './models/Offline';
import AprilFoolsCaptcha from './components/AprilFoolsCaptcha';

interface FrontpageProps {
  offlines: IOfflineIssue[];
}

const Frontpage: FC<FrontpageProps> = ({ offlines }) => (
  <>
    <AprilFoolsCaptcha />
    <div
      style={{
        padding: '20px',
        borderRadius: '8px',
        textAlign: 'center',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        marginBottom: '20px',
      }}
    >
      <p
        style={{
          fontSize: '1.1rem',
        }}
      >
        Ser du etter informasjon om fadderukene?
        <br />
        <a href="https://splash.online.ntnu.no/">Gå til programmet</a>
      </p>
    </div>
    <EventsContainer />
    <Articles />
    <Offline issues={offlines} />
    <ForCompanies />
  </>
);

export default Frontpage;
