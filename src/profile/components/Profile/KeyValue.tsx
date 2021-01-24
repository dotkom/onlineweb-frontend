import React from 'react';
import style from './kv.less';

export interface IProps {
  k: string;
  v: string | null;
  bold?: boolean;
}

export const KeyValue = ({ k, v, bold = false }: IProps) => (
  <div className={style.kv}>
    <p>{bold ? <b>{k}</b> : k}</p>
    <h3>{v || 'Ikke tilgjengelig'}</h3>
  </div>
);

export default KeyValue;
