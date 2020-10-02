import { CompactLogo } from '@dotkomonline/design-system';
import ResponsiveImage from 'common/components/ResponsiveImage';
import IResponsiveImage, { IResponsiveImageSizes } from 'common/models/ResponsiveImage';
import React, { FC, ImgHTMLAttributes } from 'react';
import style from './eventImage.less';

export interface IProps extends ImgHTMLAttributes<HTMLImageElement> {
  images: IResponsiveImage[];
  size: keyof IResponsiveImageSizes;
  color?: string;
}

const EventImage: FC<IProps> = ({ images, color, ...props }) => {
  // TODO: implement a way to display multiple event images.
  const [img] = images;
  return img ? (
    <ResponsiveImage image={img} type="event" {...props} />
  ) : (
    <div className={style.image}>
      <CompactLogo width="40%" primaryColor={color} secondaryColor={color} />
    </div>
  );
};

export default EventImage;
