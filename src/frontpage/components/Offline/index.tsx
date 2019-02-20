import Heading from 'common/components/Heading';
import React, { useEffect, useRef, useState } from 'react';
import { getOfflines, getRemainingOfflines } from '../../api/offline';

import { IOfflineIssue } from '../../models/Offline';
import CarouselArrow from './CarouselArrow';
import style from './offline.less';
import OfflineCarousel from './OfflineCarousel';

export interface IProps {}

export interface IState {
  dataRemaining: boolean;
  offlines: IOfflineIssue[];
  index: number;
  page: number;
}

export interface IOfflineRef {
  issue: IOfflineIssue;
  ref: React.RefObject<HTMLDivElement>;
}

const createOfflineRefs = (offlines: IOfflineIssue[]): IOfflineRef[] => {
  return offlines.map((issue) => ({
    issue,
    ref: React.createRef<HTMLDivElement>(),
  }));
};

export const Offline = ({  }: IProps) => {
  const [offlines, setOfflines] = useState<IOfflineRef[]>([]);
  const [currentScroll, setCurrentScroll] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);

  const getSizes = () => {
    if (offlines.length) {
      const [first] = offlines;
      if (first.ref.current && carouselRef.current) {
        return {
          element: first.ref.current.scrollWidth,
          container: carouselRef.current.clientWidth,
        };
      }
    }
    return null;
  };

  const scroll = (amount: number) => {
    const targetIndex = currentScroll + amount;
    const target = offlines[targetIndex];
    const ref = target ? target.ref.current : null;
    console.log('reg:', ref);
    if (ref) {
      ref.scrollIntoView({ behavior: 'smooth', inline: 'nearest' });
      setCurrentScroll(targetIndex);
    }
  };

  const scrollToNextRef = () => {
    const sizes = getSizes();
    console.log(sizes);
    if (sizes) {
      const amount = Math.floor(sizes.container / sizes.element);
      console.log('Amount:', amount);
      scroll(amount);
    }
  };

  const scrollToPrevRef = () => {
    const sizes = getSizes();
    console.log(sizes);
    if (sizes) {
      const amount = -Math.floor(sizes.container / sizes.element);
      console.log('Amount:', amount);
      scroll(amount);
    }
  };

  /** Get the first batch of Offlines for feast loading */
  const fetchInitial = async () => {
    const { results } = await getOfflines(1);
    const offlineRefs = createOfflineRefs(results);
    setOfflines(offlineRefs);
    fetchRemaining();
  };

  /** Get all the remaining Offlines to fill out the list */
  const fetchRemaining = async () => {
    const remaining = await getRemainingOfflines();
    const offlineRefs = createOfflineRefs(remaining);
    setOfflines([...offlines, ...offlineRefs]);
  };

  /** Fetch offlines on first mount */
  useEffect(() => {
    fetchInitial();
  }, []);

  return (
    <section className={style.container}>
      <Heading title="Offline" />

      <CarouselArrow direction="left" onClick={scrollToPrevRef} />
      <div className={style.carouselContainer} ref={carouselRef}>
        {offlines.length && <OfflineCarousel offlines={offlines} />}
      </div>
      <CarouselArrow direction="right" onClick={scrollToNextRef} />
    </section>
  );
};

export default Offline;
