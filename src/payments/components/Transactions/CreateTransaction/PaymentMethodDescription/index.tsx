import React, { FC } from 'react';

import style from './description.less';

export const PaymentMethodDescription: FC<void> = ({ children }) => {
  return <h3 className={style.description}>{children}</h3>;
};
