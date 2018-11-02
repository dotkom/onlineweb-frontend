import React from 'react';

export const StatusPolygon = ({ color = '#828282' }: { color: string }) => (
  <svg viewBox="0 0 80 60" height="50" width="105">
    <path d="M20 0H105V60H20L0 30L20 0Z" fill={color} />
  </svg>
);

export const PersonSVG = ({ color = '#fff' }: { color: string }) => (
  <svg viewBox="0 0 10 10" height="35" width="30">
    <g id="person">
      {/* Head */}
      <ellipse ry="2.5637553" rx="2.5637553" fill={color} cy="3.1303504" cx="3.9358196" id="path3713" />
      {/* Upper body */}
      <ellipse cx="4.0169015" cy="9.109993" rx="3.1364112" ry="2.9045148" fill={color} id="path3722" />
      {/* Lower body */}
      <rect fill={color} y="8.8618765" x="0.88048953" height="3.1936784" width="6.2729192" id="rect3740" />
    </g>
  </svg>
);

export default StatusPolygon;
