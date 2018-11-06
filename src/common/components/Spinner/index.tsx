import classnames from 'classnames';
import React from 'react';
import style from './spinner.less';

export interface IProps {
  primaryColor?: string;
  secondaryColor?: string;
  className?: string;
}

const Spinner = ({ primaryColor = '#FAA21B', secondaryColor = '#0060A3', className }: IProps) => (
  <section className={classnames(style.container, className || style.size)}>
    <svg className={style.circle} viewBox="0 0 506 400" fill="none">
      <circle
        cx="200"
        cy="200"
        r="198"
        transform="translate(53)"
        stroke={secondaryColor}
        strokeWidth="4"
        strokeDasharray="48 10"
      />
      <circle
        cx="163"
        cy="163"
        r="161"
        transform="translate(89 36)"
        stroke={secondaryColor}
        strokeWidth="4"
        strokeDasharray="42 10"
      />
    </svg>
    <svg className={style.lightning} viewBox="0 0 506 400" fill="none">
      <circle cx="22" cy="22" r="20" transform="translate(200 143)" stroke={primaryColor} strokeWidth="4" />
      <circle cx="22" cy="22" r="20" transform="translate(133 197)" stroke={primaryColor} strokeWidth="4" />
      <circle cx="16" cy="16" r="14" transform="translate(314 174)" stroke={primaryColor} strokeWidth="4" />
      <circle cx="12" cy="12" r="10" transform="translate(342 171)" stroke={primaryColor} strokeWidth="4" />
      <circle cx="12" cy="12" r="10" transform="translate(239 192)" stroke={primaryColor} strokeWidth="4" />
      <circle cx="12" cy="12" r="10" transform="translate(67 253)" stroke={primaryColor} strokeWidth="4" />
      <circle cx="11" cy="11" r="9" transform="translate(222 154)" stroke={primaryColor} strokeWidth="4" />
      <path
        d="M41.9012 2.00023C40.8978 12.1069 32.3707 20.0003 22 20.0003C11.6293 20.0003
               3.10217 12.1069 2.09874 2.00022L5.69367 2.00017L20.5 2.00009L36.8063 2.00017L41.9012 2.00023Z"
        transform="translate(292.676 246.907) rotate(142.1)"
        stroke={primaryColor}
        strokeWidth="4"
      />
      <path
        d="M262.536 114.961L263.155 118.943L266.792 117.208L480.72 15.1462L230.8 205.969L220.974
               131.11L220.454 127.141L216.791 128.754L19.448 215.658L249.335 30.1025L262.536 114.961Z"
        transform="translate(0 86)"
        stroke={primaryColor}
        strokeWidth="6"
      />
      <path d="M0 2L4 0L8 12.5L4 15L0 2Z" transform="translate(400.5 140.5)" fill={primaryColor} />
      <path d="M0 2L4 0L5.5 4L2 7L0 2Z" transform="translate(434.5 124.5)" fill={primaryColor} />
      <path d="M0 3L3.5625 0L7.5625 10L3.0625 11.5L0 3Z" transform="translate(64.9375 265.5)" fill={primaryColor} />
      <path d="M0 3L4 0L10.5 19.5L6.5 21.5L0 3Z" transform="translate(95 241)" fill={primaryColor} />
      <rect width="19" height="4" transform="translate(204 163)" fill={primaryColor} />
      <rect width="19" height="4" transform="translate(224 230)" fill={primaryColor} />
      <rect width="19" height="4" transform="translate(225 258)" fill={primaryColor} />
      <rect width="19" height="4" transform="translate(185 229) rotate(-90)" fill={primaryColor} />
      <rect width="19" height="4" transform="translate(185 206) rotate(-90)" fill={primaryColor} />
      <rect width="19" height="4" transform="translate(138.455 230.464) rotate(150)" fill={primaryColor} />
      <rect width="19" height="4" transform="translate(116.455 243.464) rotate(150)" fill={primaryColor} />
      <rect width="19" height="4" transform="translate(185 183) rotate(-90)" fill={primaryColor} />
      <rect width="20" height="4" transform="translate(145 217)" fill={primaryColor} />
      <rect width="20" height="4" transform="translate(153 229) rotate(-90)" fill={primaryColor} />
      <rect width="19" height="4" transform="translate(247 230)" fill={primaryColor} />
      <rect width="19" height="4" transform="translate(270 230)" fill={primaryColor} />
      <rect width="19" height="4" transform="translate(293.283 222.108) rotate(141)" fill={primaryColor} />
      <rect width="19" height="4" transform="translate(310.283 208.108) rotate(141)" fill={primaryColor} />
      <rect width="19" height="4" transform="translate(377.239 167.695) rotate(100)" fill={primaryColor} />
      <rect width="11.7261" height="4" transform="translate(379.976 151.858) rotate(100)" fill={primaryColor} />
      <rect width="9.60508" height="4" transform="translate(320.981 199.37) rotate(141)" fill={primaryColor} />
      <rect width="19" height="4" transform="translate(239 234) rotate(-90)" fill={primaryColor} />
      <rect width="19" height="4" transform="translate(239 211) rotate(-90)" fill={primaryColor} />
      <rect width="19" height="4" transform="translate(239 188) rotate(-90)" fill={primaryColor} />
      <rect width="19" height="4" transform="translate(293 230)" fill={primaryColor} />
      <circle cx="3" cy="3" r="3" transform="translate(327 187)" fill={primaryColor} />
    </svg>
  </section>
);

export default Spinner;
