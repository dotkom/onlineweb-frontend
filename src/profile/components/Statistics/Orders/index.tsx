import Markdown from 'common/components/Markdown';
import { Page, Pane, SplitPane } from 'common/components/Panes';
import { DateTime } from 'luxon';
import { getOrders } from 'profile/api/orders';
import { IOrderLine } from 'profile/models/Orders';
import React, { Component } from 'react';
import OrderFrequency from './OrderFrequency';
import OrderItemDonut from './OrderItemDonut';

const ABOUT_STATISTICS = `
  # Statistikk

  Her kan du se statistikk for forskjellige metrikker relatert til din bruker.

  _Denne statistikken vises kun for deg, og brukes ikke av Online på noen måte._
`;

export interface IProps {}

export interface IState {
  ordersLines: IOrderLine[];
}

class Orders extends Component<IProps, IState> {
  public state: IState = {
    ordersLines: []
  };

  public async componentDidMount() {
    const ordersLines = await getOrders();
    this.setState({ ordersLines });
  }

  public render() {
    const { ordersLines } = this.state;
    const frequency = ordersLines.map((line) => DateTime.fromISO(line.datetime)).sort();
    return (
      <Page>
        <Pane>
          <Markdown source={ABOUT_STATISTICS}/>
        </Pane>
        <SplitPane>
          <Pane>
            { ordersLines.length &&  <OrderItemDonut orderLines={ordersLines} />}
          </Pane>
          <Pane>
            <></>
          </Pane>
        </SplitPane>
        <Pane>
          { frequency.length && <OrderFrequency frequency={frequency} /> }
        </Pane>
      </Page>
    )
  };
}

export default Orders;
