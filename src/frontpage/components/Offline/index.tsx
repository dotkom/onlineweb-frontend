import React, { useEffect, useState } from 'react';

import { Carousel } from 'common/components/Carousel';
import { usePrefetch } from 'common/hooks/usePrefetch';
import { PrefetchKey } from 'common/utils/PrefetchState';
import { getOfflines, getRemainingOfflines } from 'frontpage/api/offline';
import { IOfflineIssue } from 'frontpage/models/Offline';

import style from './offline.less';
import OfflineCarousel from './OfflineCarousel';

export interface IProps {}

export interface IState {
  dataRemaining: boolean;
  offlines: IOfflineIssue[];
  index: number;
  page: number;
}

export const Offline = ({  }: IProps) => {
  const prefetch = usePrefetch(PrefetchKey.OFFLINES, async () => {
    const { results } = await getOfflines(1);
    return results;
  });
  const initialOfflines = prefetch && prefetch.length ? prefetch : [];
  const [offlines, setOfflines] = useState(initialOfflines);

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
    <section className={style.container}>
      <Carousel values={offlines} title="Offline">
        {(offlineRefs) => <OfflineCarousel offlines={offlineRefs} />}
      </Carousel>
    </section>
  );
};

export default Offline;
