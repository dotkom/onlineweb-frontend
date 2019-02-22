import React from 'react';

export const MEDAL_DARK = '#E0B138';
export const MEDAL_LIGHT = '#EACB7B';
export const MEDAL_BLUE = '#0060A3';
export const MEDAL_WHITE = '#F2F2F2';

export interface IRibbonTriangleProps {
  transform: string;
  fill: string;
}

export const RibbonTriangle = ({ transform, fill }: IRibbonTriangleProps) => (
  <path d="M 0 0L 60 0L 60 60L 27.5 27.5L 0 0Z" transform={transform} fill={fill} />
);

export interface IRibbonRectangleProps {
  transform: string;
  fill: string;
}

export const RibbonRectangle = ({ transform, fill }: IRibbonRectangleProps) => (
  <path d="M 0 0L 60 0L 60 90L 0 90L 0 0Z" transform={transform} fill={fill} />
);

export const MedalTag = () => (
  <>
    <path d="M 0 0L 126 0L 126 26L 0 26L 0 0Z" transform="translate(-321 -956)" fill="#E0B138" />
    <path d="M 0 0L 120 0L 120 20L 0 20L 0 0Z" transform="translate(-318 -953)" fill="#EACB7B" />
  </>
);

export interface IMedalRibbonProps {
  letters: () => JSX.Element;
}

export const MedalRibbon = ({ letters: Letters }: IMedalRibbonProps) => (
  <>
    <path d="M14 26H74V116V176L14 116V26Z" fill="#0060A3" transform="translate(-332 -956)" />
    <path d="M74 26H134V116L74 176V116V26Z" fill="#F2F2F2" transform="translate(-332 -956)" />
    <MedalTag />
    <Letters />
  </>
);

export interface IMedalbaseProps {
  letters: () => JSX.Element;
  icon: () => JSX.Element;
  title: string;
}

export const MedalBase = ({ letters, icon: Icon, title }: IMedalbaseProps) => (
  <svg width="100%" height="100%" viewBox="0 0 148 319">
    <title>{title}</title>
    <g transform="translate(332 956)">
      <MedalRibbon letters={letters} />
      <Icon />
    </g>
  </svg>
);

export interface IMedalLogoBaseProps {
  logo: string;
}

export const MedalLogoBase = ({ logo }: IMedalLogoBaseProps) => (
  <image width="126" height="126" preserveAspectRatio="none" href={logo} transform="translate(-321 -780)" />
);
