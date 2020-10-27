import React, { FC, ComponentProps } from 'react';
import NextImage from 'next/image';
import cx from 'classnames';

import { DOMAIN } from 'common/constants/endpoints';
import IResponsiveImage, { IResponsiveImageSizes, ResponsiveImageTypes } from 'common/models/ResponsiveImage';

import styles from './ResponsiveImage.less';

export type ImageType = ResponsiveImageTypes;
export type ImageSizes = IResponsiveImageSizes;
export type ImageSize = keyof ImageSizes;

type Props = Omit<ComponentProps<typeof NextImage>, 'src'> & {
  image: IResponsiveImage | null;
};

export const ResponsiveImage: FC<Props> = ({ image, alt, className, ...props }) => {
  const defaultImage = image ? image.lg : '';
  const altText = alt || image?.name;
  return (
    <NextImage
      {...props}
      src={DOMAIN + defaultImage}
      alt={altText}
      unsized
      className={cx(className, styles.imageSize)}
    />
  );
};

export default ResponsiveImage;
