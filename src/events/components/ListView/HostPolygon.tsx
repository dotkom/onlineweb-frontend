import React from 'react';

const HostPolygon = ({ color }: { color: string }) => (
  <svg width="220" height="60">
    <path d="M200 60L220 30L200.5 0H0V60H200Z" fill={ color }/>
  </svg>
);

export default HostPolygon;
