import React, { Props } from 'react';
import style from './profileCommon.less';

export const Page = ({ children }: Props<any>) => (
  <div className={style.profilePage}>
    { children }
  </div>
);

export default Page;
