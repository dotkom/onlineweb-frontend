import React, { FC } from 'react';
import style from './input.less';

interface IProps {
  success: boolean;
  message: string;
}

const SuccessMessage: FC<IProps> = ({ success, message }) => (
  <>{success && <div className={style.successMessage}>{message}</div>}</>
);

export default SuccessMessage;
