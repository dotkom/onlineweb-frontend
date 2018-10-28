import React from 'react';

export interface IProps {
  color?: string;
  checkColor?: string;
}

const Check = ({ color = '#27AE60', checkColor = 'white' }: IProps) => (
  <svg width="100%" height="100%" viewBox="0 0 27 27" fill="none">
    <circle cx="13.5" cy="13.5" r="13.5" fill={color} />
    <path d="M7.5 12.4657L6 13.9657L11 18.9657L20.5419 9.42362L19.1183 8L11 15.9657L7.5 12.4657Z" fill={checkColor} />
  </svg>
);

export default Check;
