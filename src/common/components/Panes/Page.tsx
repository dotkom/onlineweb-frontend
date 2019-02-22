import classnames from 'classnames';
import React, { ReactNode } from 'react';

import Spinner from '../Spinner';
import style from './profileCommon.less';

export interface IPageProps {
  children: ReactNode;
  loading?: boolean;
  minWidth?: boolean;
}

export const Page = ({ children, loading, minWidth = false }: IPageProps) => (
  <div className={classnames(style.page, { [style.fill]: !minWidth })}>{loading ? <Spinner /> : children}</div>
);

export default Page;
