import { Pane } from 'common/components/Panes';
import React, { Component } from 'react';
import { getMails, patchMails } from '../../../api/mail';
import { IMail } from '../../../models/Mail';
import Mail from './Mail';

export interface IState {
  addresses: IMail[];
}

class Mails extends Component<{}, IState> {
  public state: IState = { addresses: [] };

  public async componentDidMount() {
    let addresses = await getMails();
    addresses = addresses.sort((a, b) => Number(a.primary) - Number(b.primary)).reverse();
    this.setState({ addresses });
  }

  public async togglePrimary(address: IMail) {
    await patchMails(address.id, { primary: true });
    const addresses = await getMails();
    this.setState({ addresses });
  }

  public render() {
    const { addresses } = this.state;
    return (
      <Pane>
        {addresses.map((addr) => (
          <Mail {...addr} toggle={() => this.togglePrimary(addr)} key={addr.email} />
        ))}
      </Pane>
    );
  }
}

export default Mails;
