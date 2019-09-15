import React from 'react';

import { Page, Pane } from 'common/components/Panes';

export const EmptyCart = () => (
  <Page>
    <Pane>
      <p>
        Du har ingen varer i handlekurven din. Gå til <a href="https://online.ntnu.no/webshop">nettbutikken</a> for å
        kjøpe varer!
      </p>
    </Pane>
  </Page>
);
