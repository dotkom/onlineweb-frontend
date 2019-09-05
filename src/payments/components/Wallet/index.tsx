import React, { FC } from 'react';

import { md } from 'common/components/Markdown';
import { Page, Pane } from 'common/components/Panes';

import { Transactions } from 'payments/components/Transactions';
import { CreateTransaction } from 'payments/components/Transactions/CreateTransaction';
import { Purchases } from 'payments/components/Transactions/Purchases';

const ABOUT_TRANSACTIONS = md`
  # Transaksjoner

  Transaksjoner er innskuddene du har gjort til saldo hos Online.
  Dette er pengene du kan bruke i kiosken (Nibble) på Onlinekontoret.
`;

export const Wallet: FC = () => {
  return (
    <Page>
      <Pane>{ABOUT_TRANSACTIONS}</Pane>
      <CreateTransaction />
      <Transactions />
      <Purchases />
    </Page>
  );
};
