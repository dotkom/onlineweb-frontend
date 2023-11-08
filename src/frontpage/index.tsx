import React, { FC } from 'react';

import Articles from './components/Articles';
import { CommitteeStatus } from './components/Committee';
import EventsContainer from 'events/components/EventsContainer';
import ForCompanies from './components/ForCompanies';
import { IOfflineIssue } from './models/Offline';
import Offline from './components/Offline';
import ToastOld from './components/ToastOld';
import style from './frontpage.less';

interface FrontpageProps {
  offlines: IOfflineIssue[];
}

const Frontpage: FC<FrontpageProps> = ({ offlines }) => (
  <>
    <ToastOld />
    <EventsContainer />
    <Articles />
    <Offline issues={offlines} />
    <div className={style.splitPage}>
      <ForCompanies />
      <CommitteeStatus />
    </div>
  </>
);

export default Frontpage;
