import Markdown from 'common/components/Markdown';
import { FourSplitPane, Page, Pane, SplitPane } from 'common/components/Panes';
import { DateTime } from 'luxon';
import { getOrders } from 'profile/api/orders';
import { IOrder, IOrderLine } from 'profile/models/Orders';
import React, { Component, ContextType } from 'react';
import NumberStat from './NumberStat';
import OrderBar from './OrderBar';
import OrderFrequency from './OrderFrequency';
import OrderItemDonut from './OrderItemDonut';

import { UserContext } from 'authentication/providers/UserProvider';

const ABOUT_STATISTICS = `
  # Statistikk

  Her kan du se statistikk for forskjellige metrikker relatert til din bruker.

  _Denne statistikken vises kun for deg, og brukes ikke av Online på noen måte._
`;

export interface IProps {}

export interface IState {
  orderLines: IOrderLine[];
}

class Orders extends Component<IProps, IState> {
  public static contextType = UserContext;
  public context!: ContextType<typeof UserContext>;
  public state: IState = {
    orderLines: [],
  };

  public async componentDidMount() {
    const { user } = this.context;
    if (user) {
      const orderLines = await getOrders(user);
      this.setState({ orderLines });
    }
  }

  public render() {
    const { orderLines } = this.state;
    const orders = orderLines.reduce<IOrder[]>((prev, curr) => [...prev, ...curr.orders], []);
    const frequency = orderLines.map((line) => DateTime.fromISO(line.datetime)).sort();
    const totalOrderLines = orderLines.length;
    const totalOrders = orders.length;
    const totalItems = orders.reduce<number>((acc, order) => acc + order.quantity, 0);
    const totalCost = orders.reduce<number>((acc, order) => acc + Number(order.price), 0);
    return (
      <Page loading={orderLines.length === 0}>
        <Pane>
          <Markdown source={ABOUT_STATISTICS} />
        </Pane>
        <Pane>{orderLines.length && <OrderBar orderLines={orderLines} />}</Pane>
        <SplitPane>
          <Pane>{orderLines.length && <OrderItemDonut orderLines={orderLines} />}</Pane>
          <FourSplitPane>
            <Pane>
              <NumberStat name="Antall Kjøp" value={totalOrderLines} />
            </Pane>
            <Pane>
              <NumberStat name="Antall Ordre" value={totalOrders} />
            </Pane>
            <Pane>
              <NumberStat name="Antall Enheter" value={totalItems} />
            </Pane>
            <Pane>
              <NumberStat name="Total kostnad" value={`${totalCost} Kr`} />
            </Pane>
          </FourSplitPane>
        </SplitPane>
        <Pane>{frequency.length && <OrderFrequency frequency={frequency} />}</Pane>
      </Page>
    );
  }
}

export default Orders;
