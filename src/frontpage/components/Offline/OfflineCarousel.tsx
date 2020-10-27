import React from 'react';

import ResponsiveImage from 'common/components/ResponsiveImage';
import { IRefObject } from 'common/hooks/useRefMap';
import { IOfflineIssue } from 'frontpage/models/Offline';

import style from './offline.less';

export interface IProps {
  offlines: Array<IRefObject<IOfflineIssue, HTMLDivElement>>;
}

const OfflineCarousel = ({ offlines }: IProps) => (
  <>
    {offlines.map((offline) => (
      <CarouselItem key={offline.value.id} offline={offline.value} scrollRef={offline.ref} />
    ))}
  </>
);

export interface ICarouselItemProps {
  offline: IOfflineIssue;
  scrollRef: React.RefObject<HTMLDivElement>;
}

const CarouselItem = ({ offline, scrollRef }: ICarouselItemProps) => {
  return (
    <div className={style.carouselItem} ref={scrollRef}>
      <a href={offline.issue}>
        <ResponsiveImage image={offline.image} alt={offline.description} />
      </a>
    </div>
  );
};

export default OfflineCarousel;
