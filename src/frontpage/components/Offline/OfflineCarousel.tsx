import React from 'react';

import { IRefObject } from 'common/hooks/useRefMap';
import { IOfflineIssue } from 'frontpage/models/Offline';

import style from './offline.less';

export interface IProps {
  offlines: Array<IRefObject<IOfflineIssue, HTMLDivElement>>;
}

const IMAGE_SUFFIX = '.thumb.png';

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
