import { DateTime } from 'luxon';
import React, { FC, useEffect } from 'react';

import Spinner from 'common/components/Spinner';
import { DataTable, DataTableHeaders, DataTableSorters } from 'common/components/Table/DataTable';
import { useSelector, useThunk } from 'core/redux/hooks';
import { useToast } from 'core/utils/toast/useToast';
import { transformOrderData } from 'profile/api/orders';
import { fetchOrderLines } from 'shop/reducers/orderLines';

import { Paid } from '../Paid';
import style from './transactions.less';

export interface IOrderData {
  product: string;
  paid: boolean;
  amount: number;
  date: DateTime;
  price: number;
}

const tableHeaders: DataTableHeaders = {
  product: 'Produkt',
  price: 'Pris',
  amount: 'Antall',
  paid: 'Betalt',
  date: 'Dato',
};

const tableSorters: DataTableSorters<typeof tableHeaders, IOrderData> = {
  product: (a, b) => b.product.localeCompare(a.product),
  amount: (a, b) => b.amount - a.amount,
  date: (a, b) => b.date.toMillis() - a.date.toMillis(),
  paid: (a, b) => Number(b.paid) - Number(a.paid),
  price: (a, b) => b.price - a.price,
};

export const Purchases: FC = () => {
  const [displayMessage] = useToast();
  const errors = useSelector((state) => state.shop.orderLines.errors);
  const orders = useSelector((state) => transformOrderData(state.shop.orderLines.orderLines));
  const status = useSelector((state) => state.shop.orderLines.status);
  const init = useThunk(fetchOrderLines());

  useEffect(() => {
    init();
  }, []);

  useEffect(() => {
    if (errors) {
      displayMessage(String(errors));
    }
  }, [errors]);

  return (
    <div className={style.transactionsContainer}>
      {status === 'ready' ? (
        <DataTable
          headers={tableHeaders}
          title="Tidligere kjøp"
          items={orders}
          sorters={tableSorters}
          selectedHeader="date"
        >
          {(items) => items.map((order) => <Order key={order.date.toMillis() + order.product} order={order} />)}
        </DataTable>
      ) : (
        <Spinner />
      )}
    </div>
  );
};

export interface IOrderlineProps {
  order: IOrderData;
}

const Order: FC<IOrderlineProps> = ({ order }) => {
  const formattedDate = order.date.toLocaleString(DateTime.DATETIME_MED);
  return (
    <tr>
      <td className={style.centerText}>{order.product}</td>
      <td className={style.centerText}>{`${Number(order.price)} kr`}</td>
      <td className={style.centerText}>{order.amount}</td>
      <td className={style.centerIcon}>{<Paid paid={order.paid} />}</td>
      <td className={style.centerText}>{formattedDate}</td>
    </tr>
  );
};
