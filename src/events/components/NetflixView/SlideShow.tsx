import React, { FC, useContext } from 'react';
import style from './image.less';
import LargeEvent from './LargeEvent';

interface IProps {
  eventIds: number[];
}

const SlideShow: FC<IProps> = ({ eventIds }: IProps) => {
  return (
    <div className={style.slideshow}>
        <>
          {eventIds.map((eventId) => (
            <LargeEvent key={eventId} eventId={eventId} />
          ))}
        </>
    </div>
  );
};

export default SlideShow;
