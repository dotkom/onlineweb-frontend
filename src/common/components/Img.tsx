import React, { ImgHTMLAttributes } from 'react';
import { DOMAIN } from '../constants/endpoints';

/**
 * @summary Wrapper element for basic img element, adds API server address to src url.
 * @param src Source relative to api server root of OW4.
 * @param props Remaining img element props.
 */
const Img = ({ src, ...props }: ImgHTMLAttributes<HTMLImageElement>) => <img src={DOMAIN + src} {...props} />;

export default Img;
