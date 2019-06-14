import React, { FC } from 'react';

import style from './description.less';

export interface IProps {}

export const PaymentMethodDescription: FC<IProps> = ({ children }) => {
  return <h3 className={style.description}>{children}</h3>;
};
