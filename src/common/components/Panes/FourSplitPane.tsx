import React, { FC } from 'react';
import style from './profileCommon.less';

export const FourSplitPane: FC = ({ children }) => <div className={style.fourSplitPane}>{children}</div>;

export default FourSplitPane;
