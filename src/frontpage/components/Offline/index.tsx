import React, { useEffect, useState } from 'react';

import { Carousel } from 'common/components/Carousel';
import { IOfflineIssue } from 'frontpage/models/Offline';

import OfflineCarousel from './OfflineCarousel';
import { FC } from 'react';

export interface IState {
  dataRemaining: boolean;
  offlines: IOfflineIssue[];
  index: number;
  page: number;
}

interface OfflineProps {
  issues: IOfflineIssue[];
}

export const Offline: FC<OfflineProps> = ({ issues }) => {
  return (
    <Carousel values={issues} title="Offline">
      {(offlineRefs) => <OfflineCarousel offlines={offlineRefs} />}
    </Carousel>
  );
};

export default Offline;
