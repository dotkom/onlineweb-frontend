import React, { ButtonHTMLAttributes, DetailedHTMLProps, FC } from 'react';

import style from './placeholderButton.less';

type ButtonProps = DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>;

export interface IProps extends ButtonProps {}

export const PlaceholderButton: FC<IProps> = (props) => {
  return <button className={style.button} disabled {...props} />;
};
