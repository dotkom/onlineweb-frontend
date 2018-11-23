import React from 'react';

export interface ISvgProps {
  x: number;
  radius: number;
}

export interface ICircleProps extends ISvgProps {
  lineWidth: number;
  color?: string;
}

export interface ICircleCheckProps extends ISvgProps {
  color?: string;
}

export interface IDividerBarProps {
  radius: number;
  lineWidth: number;
  color?: string;
  offset?: number;
  scale?: number;
  a?: number;
  b?: number;
}

export const Circle = ({ x, radius, lineWidth, color = '#333333' }: ICircleProps) => (
  <circle cx={x} cy="12" r={radius - lineWidth / 2} strokeWidth={lineWidth} stroke={color} fill="#ffffff" />
);

export const CircleCheck = ({ x, radius, color = '#0060a3' }: ICircleCheckProps) => (
  <circle cx={x} cy="12" r={radius} stroke="none" fill={color} />
);

export const CheckMark = ({ x, radius }: ISvgProps) => (
  <g>
    <line
      x1={x - radius * 0.4}
      y1={12}
      x2={x - radius * 0.1}
      y2={12 + radius * 0.3}
      strokeLinecap="square"
      stroke="#fff"
      strokeWidth="0.5"
    />
    <line
      x1={x - radius * 0.1}
      y1={12 + radius * 0.3}
      x2={x + radius * 0.4}
      y2={12 - radius * 0.4}
      strokeLinecap="square"
      stroke="#fff"
      strokeWidth="0.5"
    />
  </g>
);

export const DividerBar = ({ offset = 0, radius, scale = 1, lineWidth, a = 0, b = 0 }: IDividerBarProps) => (
  <rect x={offset + radius * a * 2 + b * scale - lineWidth / 2} y={12 - radius} width={lineWidth} height={radius * 2} />
);
