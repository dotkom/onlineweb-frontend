import React, { FC } from 'react';

import { IIconProps } from './GenericIcon';

const Circle: FC<IIconProps> = ({ color = '#2AC6F9', iconColor = 'white' }) => (
  <svg width="100%" height="100%" viewBox="0 0 27 27" fill="none">
    <circle cx="13.5" cy="13.5" r="13.5" fill={color} />
    <circle cx="13.5" cy="13.5" r="7.2" stroke={iconColor} strokeWidth="1.6" />
  </svg>
);

export default Circle;
