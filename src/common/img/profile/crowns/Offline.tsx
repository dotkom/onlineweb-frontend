import offlineLogo from 'common/img/offline-logo.png';
import React from 'react';

export const Offline = () => (
  <svg width="100%" height="100%" viewBox="0 0 126 104">
    <g id="Canvas" fill="none">
      <g id="OfflineHat">
        <g id="Rectangle 13">
          <rect width="126" height="15" rx="7.5" transform="translate(0 89)" fill="#333333" />
        </g>
        <g id="Rectangle 14">
          <rect width="90" height="104" rx="10" transform="translate(18 0)" fill="#333333" />
        </g>
        <g id="Rectangle 15">
          <rect width="90" height="11" transform="translate(18 78)" fill="#636363" />
        </g>
        <g id="ensfarget_sort">
          <rect width="32" height="35.1475" transform="translate(42.6 23)" fill="url(#pattern0)" />
        </g>
      </g>
    </g>
    <defs>
      <pattern id="pattern0" patternContentUnits="objectBoundingBox" width="1" height="1">
        <use href="#image0" transform="translate(-8.89622e-10 0) scale(0.00546448 0.00497512)" />
      </pattern>
      <image id="image0" data-name="ensfarget_sort.png" width="183" height="201" href={offlineLogo} />
    </defs>
  </svg>
);

export default Offline;
