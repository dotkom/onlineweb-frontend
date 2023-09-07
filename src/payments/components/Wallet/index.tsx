import React, { FC, useContext } from 'react';

import { md } from 'common/components/Markdown';
import { UserProfileContext } from 'profile/providers/UserProfile';
import { Page, Pane } from 'common/components/Panes';

import { Transactions } from 'payments/components/Transactions';
import { Purchases } from 'payments/components/Transactions/Purchases';
export const Wallet: FC = () => {
  const { user } = useContext(UserProfileContext);

  const ABOUT_TRANSACTIONS = md`
# Vi bruker nå vipps i kiosken! 🔥
Nå har vi endelig gått over til ny betalingsløsning i kiosken hvor man betaler ved Vipps!

**Hvordan betaler jeg?** 😎

Scan qr koden i kiosken eller på kjøleskapet, velg produkter og betal med Vipps. Første gangen du kjøper noe må du verifisere Vipps før du betaler, så dobbeltsjekk at Vipps-betalingen går gjennom.

**Men jeg har fortsatt penger på studentkortet mitt** 😱

Frykt ikke! Vi vil ha en overgangsperiode på 2 måneder, så dere har god tid på å bruke opp saldoen deres!

Send melding til Johanna Wilmers på slack hvis det er noen spørsmål/problemer

## Gjennværende saldo: **${String(!!user ? user.saldo : 0)} kr**
  `;

  return (
    <Page>
      <Pane>{ABOUT_TRANSACTIONS}</Pane>
      <Transactions />
      <Purchases />
    </Page>
  );
};
