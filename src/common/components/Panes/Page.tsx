import React, { Props } from 'react';
import style from './profileCommon.less';

export const Page = ({ children }: Props<any>) => (
  <div className={style.page}>
    { children }
  </div>
);

export default Page;
