import React, { useEffect, useState } from 'react';

import { getOfflines, getRemainingOfflines } from 'frontpage/api/offline';
import { IOfflineIssue } from 'frontpage/models/Offline';
import OfflineList from './components/OfflineList';
import Spinner from 'common/components/Spinner';

export const Offline: React.FC = () => {
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
  return offlines.length ? <OfflineList offlines={offlines} /> : <Spinner />;
};

export default Offline;
