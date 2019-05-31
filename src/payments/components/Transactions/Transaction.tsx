import { DateTime } from 'luxon';
import React, { FC } from 'react';

import { IPaymentTransaction } from 'payments/models/PaymentTransaction';

import { Status } from '../Status';
import style from './transactions.less';
import { TypeIcon } from './TypeIcon';

export interface IProps {
  transaction: IPaymentTransaction;
}

export const Transaction: FC<IProps> = ({ transaction }) => {
  const formattedDate = DateTime.fromISO(transaction.datetime).toLocaleString(DateTime.DATETIME_MED);
  return (
    <tr>
      <td className={style.centerText}>{formattedDate}</td>
      <td className={style.centerText}>{`${transaction.amount} kr`}</td>
      <td className={style.centerIcon}>
        <Status status={transaction.status} />
      </td>
      <td>
        <div className={style.centerIcon}>
          <TypeIcon type={transaction.used_stripe ? 'stripe' : 'cash'} />
        </div>
      </td>
    </tr>
  );
};
