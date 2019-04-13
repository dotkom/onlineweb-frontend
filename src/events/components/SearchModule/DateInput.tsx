import { faCalendarAlt } from '@fortawesome/free-regular-svg-icons/';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { ChangeEvent, FC } from 'react';
import style from './search.less';

export interface IProps {
  label: string;
  time: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

const DateInput: FC<IProps> = ({ label, time, onChange }) => {
  return (
    <label className={style.dateInput}>
      <span>{label}</span>
      <input type="date" value={time} onChange={onChange} pattern="[0-9]{4}-[0-9]{2}-[0-9]{2}" required />
      <FontAwesomeIcon className={style.dateIcon} icon={faCalendarAlt} fixedWidth />
    </label>
  );
};

export default DateInput;
