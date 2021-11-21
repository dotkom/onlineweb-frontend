import React from 'react';

import { IRefObject } from 'common/hooks/useRefMap';
import NextImage from 'next/image';
import { IOfflineIssue } from 'frontpage/models/Offline';

import style from './offline.less';

export interface IProps {
  offlines: Array<IRefObject<IOfflineIssue, HTMLDivElement>>;
}

const OfflineCarousel = ({ offlines }: IProps) => (
  <>
    {offlines.map((offline) => (
      <CarouselItem key={offline.value._id} offline={offline.value} scrollRef={offline.ref} />
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
        <NextImage src={offline.image.url} alt={offline.image.title} unsized />
      </a>
    </div>
  );
};

export default OfflineCarousel;
