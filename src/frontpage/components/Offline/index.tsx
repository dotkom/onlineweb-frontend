import React, { useEffect, useState } from 'react';

import { Carousel } from 'common/components/Carousel';
import { getOfflines, getRemainingOfflines } from 'frontpage/api/offline';
import { IOfflineIssue } from 'frontpage/models/Offline';

import OfflineCarousel from './OfflineCarousel';

export interface IState {
  dataRemaining: boolean;
  offlines: IOfflineIssue[];
  index: number;
  page: number;
}

export const Offline = () => {
  const [offlines, setOfflines] = useState<IOfflineIssue[]>([]);

  /** Get the first batch of Offlines for feast loading */
  const fetchInitial = async () => {
    const { results } = await getOfflines(1);
    setOfflines(results);
    fetchRemaining();
  };

  /** Get all the remaining Offlines to fill out the list */
  const fetchRemaining = async () => {
    const remaining = await getRemainingOfflines();
    setOfflines(remaining);
  };

  /** Fetch offlines on first mount */
  useEffect(() => {
    fetchInitial();
  }, []);

  return (
    <Carousel values={offlines} title="Offline">
      {(offlineRefs) => <OfflineCarousel offlines={offlineRefs} />}
    </Carousel>
  );
};

export default Offline;
