import { DateTime } from 'luxon';
import React, { FC, useEffect } from 'react';

import CalendarChart from 'common/components/Charts/CalendarChart';
import { FourSplitPane, Page, Pane, SplitPane } from 'common/components/Panes';
import { useDispatch, useSelector } from 'core/redux/hooks';
import { IOrder } from 'shop/models';
import { fetchOrderLines } from 'shop/reducers/orderLines';

import { AccountBalance } from './AccountBalance';
import NumberStat from './NumberStat';
import OrderBar from './OrderBar';
import OrderItemDonut from './OrderItemDonut';

export const Orders: FC = () => {
  const dispatch = useDispatch();
  const orderLines = useSelector((state) => state.shop.orderLines.orderLines);

  const init = () => {
    dispatch(fetchOrderLines());
  };

  const orders = orderLines.reduce<IOrder[]>((prev, curr) => [...prev, ...curr.orders], []);
  const frequency = orderLines.map((line) => DateTime.fromISO(line.datetime)).sort();
  const totalOrderLines = orderLines.length;
  const totalItems = orders.reduce<number>((acc, order) => acc + order.quantity, 0);
  const totalCost = orders.reduce<number>((acc, order) => acc + Number(order.price), 0);

  useEffect(() => {
    init();
  }, []);

  return (
    <Page loading={orderLines.length === 0}>
      <Pane>{orderLines.length && <OrderBar orderLines={orderLines} />}</Pane>
      <SplitPane>
        <Pane>{orderLines.length && <OrderItemDonut orderLines={orderLines} />}</Pane>
        <FourSplitPane>
          <Pane>
            <NumberStat name="Antall Kjøp" value={totalOrderLines} />
          </Pane>
          <Pane>
            <NumberStat name="Antall Enheter" value={totalItems} />
          </Pane>
          <Pane>
            <AccountBalance />
          </Pane>
          <Pane>
            <NumberStat name="Total kostnad" value={`${totalCost} Kr`} />
          </Pane>
        </FourSplitPane>
      </SplitPane>
      <Pane>{frequency.length && <CalendarChart frequency={frequency} header="Kjøpskalender" />}</Pane>
    </Page>
  );
};

export default Orders;
