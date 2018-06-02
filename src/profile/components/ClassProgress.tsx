import React from 'react';

export const Circle = ({ x, radius, lineWidth, color = "#333333" }) => (
  <circle
    cx={x}
    cy="10"
    r={radius - lineWidth / 2}
    strokeWidth={lineWidth}
    stroke={color}
    fill="#ffffff"
  />
)

export const CircleCheck = ({ x, radius, color = "#0060a3" }) => (
  <circle
    cx={x}
    cy="10"
    r={radius}
    stroke="none"
    fill={color}
  />
)

export const CheckMark = ({ x, radius }) => (
  <g>
    <line
      x1={x - radius * .4}
      y1={10} x2={x - radius * .1}
      y2={10 + radius * .3}
      strokeLinecap="square"
      stroke="#fff"
      strokeWidth="0.5"
    />
    <line
      x1={x - radius * .1}
      y1={10 + radius * .3}
      x2={x + radius * .4}
      y2={10 - radius * .4}
      strokeLinecap="square"
      stroke="#fff"
      strokeWidth="0.5"
    />
  </g>
)

export const DividerBar = ({ offset, radius, scale, lineWidth, a, b }) => (
  <rect
    x={offset + radius * a * 2 + b * scale - lineWidth / 2}
    y={10 - radius}
    width={lineWidth}
    height={radius * 2}
  />
)
