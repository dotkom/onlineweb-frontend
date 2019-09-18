import classNames from 'classnames';
import React, { FC } from 'react';

import styles from './statusMessage.less';

export interface IStatusMessageProps {
  type: 'success';
}

export const StatusMessage: FC<IStatusMessageProps> = ({ type, children }) => (
  <div className={classNames([styles.statusMessage, styles[type]])}>{children}</div>
);
