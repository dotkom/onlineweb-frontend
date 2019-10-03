import classNames from 'classnames';
import React, { FC } from 'react';
import styles from './block.less';

export interface IBlockProps {
  title: string;
  className?: string;
}

const Block: FC<IBlockProps> = ({ title, children, className }) => (
  <div className={classNames(className, styles.block)}>
    <h3>{title}</h3>
    {children}
  </div>
);

export default Block;
