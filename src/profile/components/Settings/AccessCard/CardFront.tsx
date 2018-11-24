import React from 'react';

export interface IProps {
  name: string;
  studentNumber: string;
}

const CardFront = ({ name, studentNumber }: IProps) => (
  <svg viewBox="0 0 216 344" height="100%" width="100%">
    <rect width="216" height="344" rx="15" fill="#A6B47E" />
    <path d="M0 288H216V329C216 337.284 209.284 344 201 344H15C6.71573 344 0 337.284 0 329V288Z" fill="#394299" />
    <rect x="5" y="246" width="206" height="2" fill="#3C3A3A" />
    <rect x="68" y="98" width="80" height="108" fill="#C4C4C4" />
    <text x="8" y="240" width="74" height="15" fill="#3C3A3A">
      {name}
    </text>
    <text
      x="-205"
      y="190"
      width="150"
      height="150"
      fontSize="22.6"
      fontWeight="bold"
      fill="#3C3A3A"
      transform="rotate(270)"
    >
      STUDENT
    </text>
    <text x="5" y="270" width="74" height="15" fontSize="7.5" fontWeight="500" fill="#3C3A3A">
      STUDENTNR.:
    </text>
    <text x="4" y="284" width="74" height="15" fontSize="12.4" fontWeight="500" fill="#3C3A3A">
      {studentNumber}
    </text>
    <rect x="19" y="19" width="178.56" height="48.672" fill="url(#pattern0)" />
    <rect x="12" y="299" width="90" height="4" fill="white" />
    <rect x="12" y="313" width="192" height="4" fill="white" />
    <rect x="12" y="327" width="192" height="4" fill="white" />
    <rect x="114" y="299" width="90" height="4" fill="white" />
    <circle cx="108" cy="301" r="2" fill="white" />
    <image
      x="20"
      y="20"
      id="image0"
      width="178"
      height="48"
      href="https://innsida.ntnu.no/documents/10157/2546401449/logo_ntnu_bokm-sample-a.png/435f2d98-f0d0-4db8-af20-4b77ba45e27a?t=1456603981519"
    />
  </svg>
);

export default CardFront;
