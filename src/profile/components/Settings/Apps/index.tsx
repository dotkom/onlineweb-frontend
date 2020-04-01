import React from 'react';

import { Tab, Tabs } from '@dotkomonline/design-system';
import { AppConnections } from './AppConnections';
import { ManageApps } from './ManageApps';

import style from './apps.less';


const Apps = () => {
  return (
    <div className={style.apps}>
      <Tabs>
        <Tab title="Tilkoblinger">
          <AppConnections />
        </Tab>
        <Tab title="Dine apper">
          <ManageApps />
        </Tab>
      </Tabs>
    </div>
  );
};

export default Apps;
