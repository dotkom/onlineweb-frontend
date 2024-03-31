import EventsContainer from 'events/components/EventsContainer';
import React, { FC } from 'react';
import Articles from './components/Articles';
import ForCompanies from './components/ForCompanies';
import Offline from './components/Offline';
import ToastOld from './components/ToastOld';
import { IOfflineIssue } from './models/Offline';
import AprilFoolsCaptcha from './components/AprilFoolsCaptcha';

interface FrontpageProps {
  offlines: IOfflineIssue[];
}

const Frontpage: FC<FrontpageProps> = ({ offlines }) => (
  <>
    <AprilFoolsCaptcha />
    <ToastOld />
    <EventsContainer />
    <Articles />
    <Offline issues={offlines} />
    <ForCompanies />
  </>
);

export default Frontpage;
