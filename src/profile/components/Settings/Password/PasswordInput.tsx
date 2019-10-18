import React, { FC, FormEvent } from 'react';
import { ErrorMessage } from './ErrorMessage';
import style from './input.less';

interface IProps {
  label: string;
  name: string;
  requiredMessage?: string[];
  required: boolean;
  onChange: (event: FormEvent<HTMLInputElement>) => void;
}

const PasswordInput: FC<IProps> = ({ label, name, requiredMessage, required, onChange }) => {
  return (
    <div className={style.passwordInput}>
      <label htmlFor={name}>{label}</label>
      <input type="password" name={name} required={required} onChange={onChange} minLength={8} />
      <ErrorMessage errors={requiredMessage} />
    </div>
  );
};

export default PasswordInput;
