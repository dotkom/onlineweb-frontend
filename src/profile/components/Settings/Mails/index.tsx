import React, { Component } from 'react';
import { IMail } from '../../../models/Mail';
import Mail from './Mail';
import { getMails } from '../../../api/mail';
import style from './mail.less';
import classnames from 'classnames';

export interface IState {
  addresses: IMail[];
}

class Mails extends Component<{}, IState> {
  public state: IState = { addresses: [] };

  public async componentDidMount() {
    let addresses = await getMails();
    // Opinion: Primary address should be shown on top when the site first loads.
    // But the list should not be sorted all over again when an option is clicked.
    // Therefore the addresses are sorted on component mount.
    addresses = addresses.sort((a, b) => Number(a.primary) - Number(b.primary)).reverse();
    this.setState({ addresses });
  }

  public togglePrimary(index: number) {
    const { addresses } = this.state;
    const reset: IMail[] = addresses.map(addr => ({ ...addr, primary: false }));
    reset[index].primary = true;
    this.setState({ addresses: reset });
  }

  public render() {
    const { addresses } = this.state;
    return (
      <div className={classnames(style.mailForm, style.grid)}>
        {addresses.map((addr, index) => (
          <Mail {...addr} toggle={() => this.togglePrimary(index)} key={addr.email} />
        ))}
      </div>
    );
  }
}

export default Mails;
