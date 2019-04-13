import React, { ChangeEvent, FC } from 'react';
import style from './search.less';

export interface IProps {
  label: string;
  time: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

const DateInput: FC<IProps> = ({ label, time, onChange }) => {
  return (
    <div className={style.dateInput}>
      <label>
        {label}
      </label>
      <input type="date" value={time} onChange={onChange} pattern="[0-9]{4}-[0-9]{2}-[0-9]{2}" required />
    </div>
  );
};

export default DateInput;
