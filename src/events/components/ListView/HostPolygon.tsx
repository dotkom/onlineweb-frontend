import React from 'react';

const HostPolygon = ({ color }: { color: string }) => (
  <svg viewBox="0 0 220 60" height="50">
    <path d="M200 60L220 30L200.5 0H0V60H200Z" fill={color} />
  </svg>
);

export default HostPolygon;
