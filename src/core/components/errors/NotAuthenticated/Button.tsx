import classnames from 'classnames';
import React, { HTMLProps } from 'react';

import style from './button.less';

export interface IButtonProps extends HTMLProps<HTMLButtonElement> {
  inverse?: boolean;
}

export const Button = ({ inverse = false, ...props }: IButtonProps) => {
  return (
    <button
      {...props}
      className={classnames(style.button, {
        [style.buttonColors]: !inverse,
        [style.buttonColorsInverse]: inverse,
      })}
    />
  );
};

export default Button;
