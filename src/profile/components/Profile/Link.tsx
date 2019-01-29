import React from 'react';
import style from './lk.less';

export interface IProps {
  k: string;
  v: string | null;
}

export const Link = ({ k, v }: IProps) => {
  return (
    <div className={style.lk}>
      <p>{k}</p>
      {v ? <a href={v}>{v}</a> : <p>Ikke tilgjengelig</p>}
    </div>
  );
};

export default Link;
