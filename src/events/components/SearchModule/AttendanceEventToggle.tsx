import React, { ChangeEvent, FC } from 'react';
import style from './search.less';

export interface IProps {
  label: string;
  checked: boolean;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

export const AttendanceEventToggle: FC<IProps> = ({ label, checked, onChange }) => {
  return (
    <label className={style.attendanceEventToggle}>
      <input type="checkbox" checked={checked} onChange={onChange} />
      <span>{label}</span>
    </label>
  );
};
