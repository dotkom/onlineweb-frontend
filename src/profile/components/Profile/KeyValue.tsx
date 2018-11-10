import React from 'react';
import style from './kv.less'

export interface IProps {
  k: string;
  v: string;
}

export const KeyValue = ({ k, v }: IProps) => (
  <div className={style.kv}>
    <p>{ k }</p>
    <h3>{ v }</h3>
  </div>
);

export default KeyValue;
