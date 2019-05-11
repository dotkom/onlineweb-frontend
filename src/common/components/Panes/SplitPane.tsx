import React, { FC } from 'react';
import style from './profileCommon.less';

export const SplitPane: FC = ({ children }) => <div className={style.splitPane}>{children}</div>;

export default SplitPane;
