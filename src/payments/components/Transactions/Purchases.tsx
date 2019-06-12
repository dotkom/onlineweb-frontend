import { DateTime } from 'luxon';
import React, { FC, useEffect, useState } from 'react';

import { getUser } from 'authentication/api';
import Spinner from 'common/components/Spinner';
import { DataTable, DataTableHeaders, DataTableSorters } from 'common/components/Table/DataTable';
import { useToast } from 'core/utils/toast/useToast';
import { getOrders } from 'profile/api/orders';
import { IOrderLine } from 'profile/models/Orders';

import { Paid } from '../Paid';
import style from './transactions.less';

export interface IOrderData {
  product: string;
  paid: boolean;
  amount: number;
  date: DateTime;
  price: number;
}

const transformOrderData = (orderLines: IOrderLine[]): IOrderData[] => {
  const orderData: IOrderData[] = [];
  for (const orderLine of orderLines) {
    for (const data of orderLine.orders) {
      orderData.push({
        amount: data.quantity,
        date: DateTime.fromISO(orderLine.datetime),
        paid: orderLine.paid,
        price: data.price,
        product: data.content_object.name,
      });
    }
  }
  return orderData;
};

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
  const [ready, setReady] = useState(false);
  const [orders, setOrders] = useState<IOrderData[]>([]);
  const [displayMessage] = useToast();

  const fetchOrders = async () => {
    try {
      const user = await getUser();
      const newOrders = await getOrders(user);
      const orderData = transformOrderData(newOrders);
      setOrders(orderData);
    } catch (err) {
      displayMessage('Det skjedde en feil under hentingen av ordre');
    }
    setReady(true);
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className={style.transactionsContainer}>
      {ready ? (
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
