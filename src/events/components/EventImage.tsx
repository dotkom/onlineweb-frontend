import { CompactLogo } from '@dotkomonline/design-system';
import ResponsiveImage from 'common/components/ResponsiveImage';
import IResponsiveImage from 'common/models/ResponsiveImage';
import React, { FC, ComponentProps } from 'react';
import style from './eventImage.less';

type Props = Omit<ComponentProps<typeof ResponsiveImage>, 'image'> & {
  images: IResponsiveImage[];
  color?: string;
};

const EventImage: FC<Props> = ({ images, color, ...props }) => {
  // TODO: implement a way to display multiple event images.
  const [img] = images;
  return img ? (
    <ResponsiveImage image={img} {...props} />
  ) : (
    <div className={style.image}>
      <CompactLogo width="40%" primaryColor={color} secondaryColor={color} />
    </div>
  );
};

export default EventImage;
