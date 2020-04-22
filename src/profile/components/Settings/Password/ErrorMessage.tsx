import React, { FC } from 'react';
import style from './input.less';

interface IProps {
  errors?: string[];
}

export const ErrorMessage: FC<IProps> = ({ errors }) => {
  return (
    <>
      {errors
        ? errors.map((error, index) => (
            <li key={`error${index}`} className={style.errorMessage}>
              <ol>{error}</ol>
            </li>
          ))
        : null}
    </>
  );
};
