import React from 'react';

const StatusPolygon = ({ color = '#828282' }: { color: string }) => (
  <svg viewBox="0 0 80 60" height="50">
    <path d="M20 0H80V60H20L0 30L20 0Z" fill={ color } />
  </svg>
);

export default StatusPolygon;
