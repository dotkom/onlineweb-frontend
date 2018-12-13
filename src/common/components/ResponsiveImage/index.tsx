import React, { ImgHTMLAttributes } from 'react';
import { DOMAIN } from '../../constants/endpoints';
import IImage, { IImageSizes } from '../../models/Image';

export interface IProps extends ImgHTMLAttributes<HTMLImageElement> {
  image: IImage;
  size: keyof IImageSizes;
}

const ResponsiveImage = ({ image, size, alt, ...props }: IProps) => {
  const defaultImage = image[size];
  const altText = alt || image.name;
  return <img {...props} src={DOMAIN + defaultImage} alt={altText} />;
};

export default ResponsiveImage;
