import React, { ButtonHTMLAttributes, DetailedHTMLProps, FC } from 'react';

import style from './placeholderButton.less';

type ButtonProps = DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>;

export type IProps = ButtonProps;

export const PlaceholderButton: FC<IProps> = (props) => {
  return <button className={style.button} disabled {...props} />;
};
