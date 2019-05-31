import React, { FC } from 'react';

import { IIconProps } from './GenericIcon';

const Square: FC<IIconProps> = ({ color = '#8A35E0', iconColor = 'white' }) => (
  <svg width="100%" height="100%" viewBox="0 0 27 27" fill="none">
    <circle cx="13.5" cy="13.5" r="13.5" fill={color} />
    <rect x="7.3" y="7.3" width="12.4" height="12.4" stroke={iconColor} strokeWidth="1.6" />
  </svg>
);

export default Square;
