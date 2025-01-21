import React, { FC, ReactNode } from 'react';
import styles from './alert.less';

const Alert: FC<{ children: ReactNode; validUntil: Date }> = ({ children, validUntil }) => {
  if (new Date() > validUntil) {
    return null;
  }

  return <div className={styles.alert}>{children}</div>;
};

export default Alert;
