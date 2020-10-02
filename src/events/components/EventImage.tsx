import { CompactLogo, Logo } from '@dotkomonline/design-system';
import ResponsiveImage from 'common/components/ResponsiveImage';
import IResponsiveImage, { IResponsiveImageSizes } from 'common/models/ResponsiveImage';
import React, { FC, ImgHTMLAttributes } from 'react';

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
    <CompactLogo primaryColor={color} secondaryColor={color} />
  );
};

export default EventImage;
