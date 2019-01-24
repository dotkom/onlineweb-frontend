import { Pane } from 'common/components/Panes';
import React, { Component } from 'react';
import { getPayments } from '../../../api/payment';
import { IPayment } from '../../../models/Payment';
import Payment from './Payment';
import Placeholder from './Placeholder';

export interface IState {
  payments: IPayment[];
  loaded: boolean;
}

class Payments extends Component<{}, IState> {
  public state: IState = {
    payments: [],
    loaded: false,
  };

  public async componentDidMount() {
    const payments = await getPayments();
    this.setState({ payments, loaded: true });
  }

  public render() {
    const { payments, loaded } = this.state;
    return (
      <Pane>
        {!loaded ? (
          <Placeholder />
        ) : !payments.length ? (
          <div> Du har ingen betalinger </div>
        ) : (
          payments.map((payment) => <Payment key={payment.object_id} {...payment} />)
        )}
      </Pane>
    );
  }
}

export default Payments;
