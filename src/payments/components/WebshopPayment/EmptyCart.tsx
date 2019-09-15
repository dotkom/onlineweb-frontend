import React from 'react';

import { Page, Pane } from 'common/components/Panes';

const WEBSHOP_URL = `${process.env.OW4_ADDRESS}/webshop`;

export const EmptyCart = () => (
  <Page>
    <Pane>
      <p>
        Du har ingen varer i handlekurven din. Gå til <a href={WEBSHOP_URL}>nettbutikken</a> for å kjøpe varer.
      </p>
    </Pane>
  </Page>
);
