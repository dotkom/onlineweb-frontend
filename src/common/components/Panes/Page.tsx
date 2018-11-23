import React, { ReactNode } from 'react';
import Spinner from '../Spinner';
import style from './profileCommon.less';

export interface IPageProps {
  children: ReactNode;
  loading?: boolean;
}

export const Page = ({ children, loading }: IPageProps) => (
  <div className={style.page}>{loading ? <Spinner /> : children}</div>
);

export default Page;
