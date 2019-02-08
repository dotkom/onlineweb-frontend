import React from 'react';

export interface IProps {
  color?: string;
  crossColor?: string;
}

const Cross = ({ color = '#EB5757', crossColor = 'white' }: IProps) => (
  <svg width="100%" height="100%" viewBox="0 0 27 27" fill="none">
    <circle cx="13.5" cy="13.5" r="13.5" fill={color} />
    <path d="M7.41895 8.55029L8.55032 7.41892L19.5812 18.4498L18.4498 19.5812L7.41895 8.55029Z" fill={crossColor} />
    <path d="M8.55029 19.5811L7.41892 18.4497L18.4498 7.41882L19.5812 8.55019L8.55029 19.5811Z" fill={crossColor} />
  </svg>
);

export default Cross;
