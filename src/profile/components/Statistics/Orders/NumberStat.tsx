import React from 'react';
import style from './orders.less';

export interface IProps {
  name: string;
  value: number | string;
}

const NumberStat = ({ name, value }: IProps) => (
  <div className={style.numberStat}>
    <h2>
      { name }
    </h2>
    <p>
      { value }
    </p>
  </div>
);

export default NumberStat;
