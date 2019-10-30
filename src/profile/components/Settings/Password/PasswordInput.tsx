import React, { FC, InputHTMLAttributes } from 'react';
import { ErrorMessage } from './ErrorMessage';
import style from './input.less';

interface IProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  requiredMessage?: string[];
}

const PasswordInput: FC<IProps> = ({ label, requiredMessage, ...props }) => {
  return (
    <div className={style.passwordInput}>
      <label>
        {label}
        <input {...props} type="password" minLength={8} />
      </label>
      <ErrorMessage errors={requiredMessage} />
    </div>
  );
};

export default PasswordInput;
