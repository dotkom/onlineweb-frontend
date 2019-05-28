import { DateTime } from 'luxon';
import React, { FC, useEffect, useState } from 'react';

import { getUser } from 'authentication/api';
import Spinner from 'common/components/Spinner';
import { Table } from 'common/components/Table';
import { useToast } from 'core/utils/toast/useToast';
import { getOrders } from 'profile/api/orders';
import { IOrderLine } from 'profile/models/Orders';

import { Paid } from '../Paid';
import style from './transactions.less';

export const Purchases: FC = () => {
  const [ready, setReady] = useState(false);
  const [orders, setOrders] = useState<IOrderLine[]>([]);
  const [displayMessage] = useToast();

  const fetchOrders = async () => {
    try {
      const user = await getUser();
      const newOrders = await getOrders(user);
      setOrders(newOrders);
    } catch (err) {
      displayMessage('Det skjedde en feil under hentingen av ordre');
    }
    setReady(true);
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const sortedOrders = orders.sort((a, b) => Date.parse(b.datetime) - Date.parse(a.datetime));

  return (
    <div className={style.transactionsContainer}>
      {ready ? (
        <Table headers={['Produkt', 'Pris', 'Antall', 'Betalt', 'Dato']} title="Tidligere kjøp">
          {sortedOrders.map((order) => (
            <OrderLine key={order.datetime} orderLine={order} />
          ))}
        </Table>
      ) : (
        <Spinner />
      )}
    </div>
  );
};

export interface IOrderlineProps {
  orderLine: IOrderLine;
}

const OrderLine: FC<IOrderlineProps> = ({ orderLine }) => {
  const formattedDate = DateTime.fromISO(orderLine.datetime).toLocaleString(DateTime.DATETIME_MED);
  return (
    <>
      {orderLine.orders.map((order) => (
        <tr key={`${orderLine.datetime}-${order.content_object.name}`}>
          <td className={style.centerText}>{order.content_object.name}</td>
          <td className={style.centerText}>{`${Number(order.price)} kr`}</td>
          <td className={style.centerText}>{order.quantity}</td>
          <td className={style.centerIcon}>{<Paid paid={orderLine.paid} />}</td>
          <td className={style.centerText}>{formattedDate}</td>
        </tr>
      ))}
    </>
  );
};
