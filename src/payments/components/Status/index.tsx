import React, { FC } from 'react';

import Check from 'common/components/Verification/Check';
import Circle from 'common/components/Verification/Circle';
import Cross from 'common/components/Verification/Cross';
import Pause from 'common/components/Verification/Pause';
import Square from 'common/components/Verification/Square';
import { PaymentStatus } from 'payments/models/Payment';

import style from './status.less';

export const getStatusDisplay = (status: PaymentStatus) => {
  switch (status) {
    case 'pending':
      return 'Uferdig';
    case 'succeeded':
      return 'Betalt, ikke lagret';
    case 'done':
      return 'Betalt';
    case 'refunded':
      return 'Refundert, ikke lagret';
    case 'removed':
      return 'Refundert og fjernet';
  }
};

export const getStatusIcon = (status: PaymentStatus) => {
  switch (status) {
    case 'pending':
      return Pause;
    case 'succeeded':
      return Circle;
    case 'done':
      return Check;
    case 'refunded':
      return Square;
    case 'removed':
      return Cross;
  }
};

export interface IProps {
  status: PaymentStatus;
}

export const Status: FC<IProps> = ({ status }) => {
  const text = getStatusDisplay(status);
  const Icon = getStatusIcon(status);

  return (
    <p className={style.icon} title={text}>
      <Icon />
    </p>
  );
};
