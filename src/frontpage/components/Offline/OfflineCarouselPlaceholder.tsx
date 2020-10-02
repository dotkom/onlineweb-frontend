import { CompactLogo } from '@dotkomonline/design-system';
import classnames from 'classnames';
import { IRefObject } from 'common/hooks/useRefMap';
import React from 'react';
import style from './offline.less';

export interface IProps {
  offlines: Array<IRefObject<number, HTMLDivElement>>;
}

const OfflineCarouselPlaceholder = ({ offlines }: IProps) => (
  <>
    {offlines.map((offline) => (
      <CarouselItem key={offline.value} index={offline.value} scrollRef={offline.ref} />
    ))}
  </>
);

export interface ICarouselItemProps {
  index: number;
  scrollRef: React.RefObject<HTMLDivElement>;
}

const CarouselItem = ({ index, scrollRef }: ICarouselItemProps) => {
  return (
    <div className={classnames(style.carouselItem)} ref={scrollRef}>
      <CompactLogo />
      <p>Tom utgave nr {index}</p>
    </div>
  );
};

export default OfflineCarouselPlaceholder;
