import React, { ReactNode } from 'react';
import Spinner from '../Spinner';
import style from './profileCommon.less';

export interface IProps {
  children: ReactNode;
  loading?: boolean;
}

export const Page = ({ children, loading }: IProps) => (
  <div className={style.page}>{loading ? <Spinner /> : children}</div>
);

export default Page;
