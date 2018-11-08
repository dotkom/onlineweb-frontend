import classNames from 'classnames';
import React, { ReactChild } from 'react';
import styles from './block.less';

export interface IBlockProps {
  title: string;
  className?: string;
  children: ReactChild | ReactChild[];
}

const Block = ({ title, children, className }: IBlockProps) => (
  <div className={classNames(className, styles.block)}>
    <h3>{title}</h3>
    {children}
  </div>
);

export default Block;
