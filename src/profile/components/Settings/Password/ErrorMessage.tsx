import React, { FC } from 'react';
import style from './input.less';

interface IProps {
  errors?: string[];
}

export const ErrorMessage: FC<IProps> = ({ errors }) => (
  <>
    {errors
      ? errors.map((error) => (
          <li className={style.errorMessage}>
            <ol>{error}</ol>
          </li>
        ))
      : null}
  </>
);
