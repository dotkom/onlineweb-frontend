import React from 'react';
import { IOfflineIssue } from '../../models/Offline';
import style from './offline.less';

export interface IProps {
  offlines: IOfflineIssue[];
}

const IMAGE_SUFFIX = '.thumb.png';

const OfflineCarousel = ({ offlines }: IProps) => (
  <div className={style.carousel}>
    {offlines.map(offline => (
      <CarouselItem key={offline.id} {...offline} />
    ))}
  </div>
);

const CarouselItem = ({ description, id, issue, release_date, title }: IOfflineIssue) => {
  const thumbnail = issue + IMAGE_SUFFIX;
  return (
    <div>
      <a href={issue}>
        <img src={thumbnail} />
        <p>{title}</p>
      </a>
    </div>
  );
};

export default OfflineCarousel;
