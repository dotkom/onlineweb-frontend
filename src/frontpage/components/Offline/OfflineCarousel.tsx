import React from 'react';

import { IOfflineIssue } from 'frontpage/models/Offline';

import { IOfflineRef } from './index';
import style from './offline.less';

export interface IProps {
  offlines: IOfflineRef[];
}

const IMAGE_SUFFIX = '.thumb.png';

const OfflineCarousel = ({ offlines }: IProps) => (
  <div className={style.carousel}>
    {offlines.map((offline) => (
      <CarouselItem key={offline.issue.id} offline={offline.issue} scrollRef={offline.ref} />
    ))}
  </div>
);

export interface ICarouselItemProps {
  offline: IOfflineIssue;
  scrollRef: React.RefObject<HTMLDivElement>;
}

const CarouselItem = ({ offline, scrollRef }: ICarouselItemProps) => {
  const thumbnail = offline.issue + IMAGE_SUFFIX;

  return (
    <div className={style.carouselItem} ref={scrollRef}>
      <a href={offline.issue}>
        <img src={thumbnail} />
        <p>{offline.title}</p>
      </a>
    </div>
  );
};

export default OfflineCarousel;
