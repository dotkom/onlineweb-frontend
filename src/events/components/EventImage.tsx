import ResponsiveImage from 'common/components/ResponsiveImage';
import IResponsiveImage, { IResponsiveImageSizes } from 'common/models/ResponsiveImage';
import React, { FC, ImgHTMLAttributes } from 'react';
import { ICompanyEvent } from '../models/Event';
import { DefaultEventImage } from './DefaultEventImage';

export interface IProps extends ImgHTMLAttributes<HTMLImageElement> {
  image: IResponsiveImage | null;
  companyEvents: ICompanyEvent[];
  size: keyof IResponsiveImageSizes;
  color?: string;
}

const EventImage: FC<IProps> = ({ image, companyEvents: [companyEvent], color, ...props }) => {
  const img = companyEvent ? companyEvent.company.image : image;
  return img ? <ResponsiveImage image={img} type="event" {...props} /> : <DefaultEventImage color={color} />;
};

export default EventImage;
