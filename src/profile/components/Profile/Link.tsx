import React from 'react';
import style from './lk.less'

export interface IProps {
  k: string;
  v: string;
}

export const Link = ({ k, v }: IProps) => (
  <div className={style.lk}>
    <p>{ k }</p>
    <a href={ v }>{ v }</a>
  </div>
);

export default Link;
