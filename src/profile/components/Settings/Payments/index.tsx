import React, { Component, Fragment } from 'react';
import { IPayment } from '../../../models/Payment';
import { getPayments } from '../../../api/payment';
import Placeholder from './Placeholder';
import Payment from './Payment';

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
      <div>
        {!loaded ? (
          <Placeholder />
        ) : !payments.length ? (
          <div> Du har ingen betalinger </div>
        ) : (
          payments.map(payment => <Payment {...payment} />)
        )}
      </div>
    );
  }
}

export default Payments;
