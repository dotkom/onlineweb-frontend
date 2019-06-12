import React, { FC } from 'react';

import ResponsiveImage from 'common/components/ResponsiveImage';
import IResponsiveImage from 'common/models/ResponsiveImage';

import style from './image.less';

export interface IProps {
  image: IResponsiveImage | null;
}

export const Image: FC<IProps> = ({ image }) => {
  return (
    <div className={style.imageContainer}>
      {image ? <ResponsiveImage image={image} size="xs" type="hobby" /> : null}
    </div>
  );
};
