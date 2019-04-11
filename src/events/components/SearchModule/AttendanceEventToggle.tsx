import React, { ChangeEvent, FC } from 'react';

export interface IProps {
  label: string;
  checked: boolean;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

export const AttendanceEventToggle: FC<IProps> = ({ label, checked, onChange }) => {
  return (
    <label>
      {label}
      <input type="checkbox" checked={checked} onChange={onChange} />
    </label>
  );
};
