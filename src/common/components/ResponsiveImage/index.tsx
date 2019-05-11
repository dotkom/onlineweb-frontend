import React, { FC, ImgHTMLAttributes, useEffect, useState } from 'react';

import { DOMAIN } from 'common/constants/endpoints';
import { useBoundingRect } from 'common/hooks/useBoundingRect';
import IResponsiveImage, {
  IMAGE_DIMENSIONS,
  IResponsiveImageSizes,
  ResponsiveImageTypes,
} from 'common/models/ResponsiveImage';
import { getKeys } from 'common/utils/tsHacks';

export type ImageType = ResponsiveImageTypes;
export type ImageSizes = IResponsiveImageSizes;
export type ImageSize = keyof ImageSizes;

export interface IProps extends ImgHTMLAttributes<HTMLImageElement> {
  image: IResponsiveImage;
  size: ImageSize;
  type: ImageType;
}

/**
 * @summary Get the key types of images sorted by width.
 * @example ['xs', 'sm', 'md', 'lg']
 * @param {ImageType} type
 */
const getSortedDimensionKeys = (type: ImageType) => {
  return getKeys(IMAGE_DIMENSIONS[type])
    .sort((a, b) => {
      const [aWidth] = IMAGE_DIMENSIONS[type][a];
      const [bWidth] = IMAGE_DIMENSIONS[type][b];
      return aWidth - bWidth;
    })
    .filter((t) => t !== 'wide'); // Filter wide because it is unstable, and just mimicks 'lg'.
};

/**
 * @summary Get the most fitting image version to display on screen based on the client screen/pixel size.
 * @param {ResponsiveImageTypes} type
 * @param {number} displayWidth The actual width of the displayed image in real pixels on the screen.
 * @param {ImageSize} currentSize The default/currently displayed size. Resolution should never be downgraded.
 */
const getOptimalImageSize = (type: ImageType, displayWidth: number, currentSize: ImageSize): ImageSize => {
  const dimensions = IMAGE_DIMENSIONS[type];
  const keys = getSortedDimensionKeys(type);

  /** Flag if the compared sizes are larger than the currently displayed size */
  let passedCurrent = false;

  for (let i = 0; i < keys.length - 1; i++) {
    /** Mark current size as larger than current size */
    if (keys[i] === currentSize) {
      passedCurrent = true;
    }

    /** Find most fitting image size depending on currently displayed size in DOM */
    const [currentWidth] = dimensions[keys[i]];
    const [nextWidth] = dimensions[keys[i + 1]];
    if (passedCurrent && displayWidth > currentWidth && displayWidth <= nextWidth) {
      return keys[i];
    }
  }

  /** If no fitting alternative is found, use the supplied default */
  return currentSize;
};

export const ResponsiveImage: FC<IProps> = ({ image, size, alt, type, ...props }) => {
  const [responsiveSize, setResponsiveSize] = useState<ImageSize>(size);
  const [ref, boundingRect] = useBoundingRect<HTMLImageElement>();

  useEffect(() => {
    if (boundingRect) {
      /** Calculate real pixel size based on image size in the DOM */
      const width = boundingRect.width * window.devicePixelRatio;
      const optimalSize = getOptimalImageSize(type, width, size);
      setResponsiveSize(optimalSize);
    }
  }, [boundingRect]);

  const defaultImage = image[responsiveSize];
  const altText = alt || image.name;

  return <img {...props} ref={ref} src={DOMAIN + defaultImage} alt={altText} />;
};

export default ResponsiveImage;
