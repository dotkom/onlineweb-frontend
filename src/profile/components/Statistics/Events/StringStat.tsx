import React from 'react';
import style from './events.less';

export interface IProps {
  name: string;
  value: string;
}

const StringStat = ({ name, value }: IProps) => (
  <div className={style.stringStat}>
    <h2>{name}</h2>
    <p>{value}</p>
  </div>
);

export default StringStat;
