import React from 'react';

export const Lock = () => {
  return (
    <svg width="100%" height="100%" viewBox="0 0 240 240" fill="none">
      <g filter="url(#not-authenticated-lock-filter)">
        <circle cx="120" cy="120" r="120" fill="url(#not-authenticated-lock-paint-gradient)" />
      </g>
      <rect x="60" y="105" width="120" height="100" rx="10" fill="white" />
      <path
        d="M86 81C86 75.4772 90.4772 71 96 71H144.115C149.638 71 154.115 75.4772 154.115 81V107C154.115 112.523 149.638 117 144.115 117H96C90.4771 117 86 112.523 86 107V81Z"
        stroke="white"
        strokeWidth="10"
      />
      <path
        d="M110.598 157.474C110.835 156.604 111.626 156 112.528 156H127.472C128.374 156 129.165 156.604 129.402 157.474L134.311 175.474C134.658 176.746 133.7 178 132.381 178H107.618C106.3 178 105.342 176.746 105.689 175.474L110.598 157.474Z"
        fill="#3F9DD0"
      />
      <circle cx="120" cy="147" r="15" fill="#3F9DD0" />
      <defs>
        <filter
          id="not-authenticated-lock-filter"
          x="0"
          y="0"
          width="240"
          height="244"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="4" />
          <feGaussianBlur stdDeviation="2" />
          <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
          <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
          <feBlend mode="normal" in2="shape" result="effect1_innerShadow" />
        </filter>
        <linearGradient
          id="not-authenticated-lock-paint-gradient"
          x1="335.5"
          y1="149"
          x2="-17.5"
          y2="-19"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#39DCE7" />
          <stop offset="0.94471" stopColor="#0060A3" />
        </linearGradient>
      </defs>
    </svg>
  );
};
