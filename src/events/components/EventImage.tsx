import ResponsiveImage from 'common/components/ResponsiveImage';
import IResponsiveImage, { DEFAULT_EVENT_IMAGE, IResponsiveImageSizes } from 'common/models/ResponsiveImage';
import React, { ImgHTMLAttributes } from 'react';
import { ICompanyEvent } from '../models/Event';

export interface IProps extends ImgHTMLAttributes<HTMLImageElement> {
  image: IResponsiveImage | null;
  companyEvents: ICompanyEvent[];
  size: keyof IResponsiveImageSizes;
}

const EventImage = ({ image, companyEvents: [companyEvent], ...props }: IProps) => {
  const img = companyEvent ? companyEvent.company.image : image;
  const src = img || DEFAULT_EVENT_IMAGE;
  return <ResponsiveImage image={src} {...props} />;
};

export default EventImage;
