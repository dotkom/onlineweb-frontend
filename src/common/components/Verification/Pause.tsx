import React, { FC } from 'react';

import { IIconProps } from './GenericIcon';

const Pause: FC<IIconProps> = ({ color = '#C4C4c4', iconColor = 'white' }) => (
  <svg width="100%" height="100%" viewBox="0 0 27 27" fill="none">
    <circle cx="13.5" cy="13.5" r="13.5" fill={color} />
    <rect x="15.5" y="8" width="3" height="11" fill={iconColor} />
    <rect x="8.5" y="8" width="3" height="11" fill={iconColor} />
  </svg>
);

export default Pause;
