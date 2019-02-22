import ResponsiveImage from 'common/components/ResponsiveImage';
import IImage, { DEFAULT_EVENT_IMAGE, IImageSizes } from 'common/models/Image';
import React, { ImgHTMLAttributes } from 'react';
import { ICompanyEvent } from '../models/Event';

export interface IProps extends ImgHTMLAttributes<HTMLImageElement> {
  image: IImage | null;
  companyEvents: ICompanyEvent[];
  size: keyof IImageSizes;
}

const EventImage = ({ image, companyEvents: [companyEvent], ...props }: IProps) => {
  const img = companyEvent ? companyEvent.company.image : image;
  const src = img || DEFAULT_EVENT_IMAGE;
  return <ResponsiveImage image={src} {...props} />;
};

export default EventImage;
