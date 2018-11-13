import React from 'react';
import style from './list.less';

const HostPolygon = ({ children, color }: { children: string; color: string }) => (
  <div className={style.hostPolygon} style={{ color }}>
    <p className={style.host}>{children}</p>
  </div>
);

export default HostPolygon;
