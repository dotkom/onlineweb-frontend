import React, { ChangeEvent, FC } from 'react';

import style from './select.less';

export const SALDO_VALUES = [100, 200, 300, 500, 800, 1000];
export const DEFAULT_SALDO_VALUE = SALDO_VALUES[1];

export interface IProps {
  onChange: (amount: number) => void;
  selected: number;
}

export const SaldoSelect: FC<IProps> = ({ onChange, selected }) => {
  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    onChange(Number(event.target.value));
  };

  return (
    <select className={style.amountSelect} onChange={handleChange} value={selected}>
      {SALDO_VALUES.map((value) => (
        <option value={value} key={value}>{`${value} kr`}</option>
      ))}
    </select>
  );
};
