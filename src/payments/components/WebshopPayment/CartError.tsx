import React from 'react';

import { md } from 'common/components/Markdown';
import { Page, Pane } from 'common/components/Panes';

const CART_ERROR = md`
## Feil i handlevognen

Vennligst gå til [https://online.ntnu.no/webshop](nettbutikken) og, slett varene og prøv igjen.
`;

export const CartError = () => (
  <Page>
    <Pane>{CART_ERROR}</Pane>
  </Page>
);
