import React, { ImgHTMLAttributes } from 'react';
import { DOMAIN } from '../../constants/endpoints';
import IResponsiveImage, { IResponsiveImageSizes } from '../../models/ResponsiveImage';

export interface IProps extends ImgHTMLAttributes<HTMLImageElement> {
  image: IResponsiveImage;
  size: keyof IResponsiveImageSizes;
}

export const ResponsiveImage = ({ image, size, alt, ...props }: IProps) => {
  const defaultImage = image[size];
  const altText = alt || image.name;
  return <img {...props} src={DOMAIN + defaultImage} alt={altText} />;
};

export default ResponsiveImage;
