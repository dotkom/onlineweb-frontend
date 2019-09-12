import React, { useEffect, useState } from 'react';

import { md } from 'common/components/Markdown';

import { Page, Pane } from 'common/components/Panes';

import Spinner from 'common/components/Spinner';
import { IOrderLine } from 'profile/models/Orders';
import { getOrderLines } from 'webshop/api';
import { Payment } from '../Payment';

const ABOUT_WEBSHOP_PAYMENT = md`
  # Webshop-betaling

  Velkommen til en beta-versjon av Onlines nye betalingsside! Dotkom minner om at de nye nettsidene til Online enda er under utvikling, og vi setter pris på all tilbakemelding du kan gi.
`;

export const WebshopPayment = () => {
  const [orderLines, setOrderLines] = useState<IOrderLine[]>();

  const loadOrderLines = async () => {
    const data = await getOrderLines();
    setOrderLines(data);
  };

  useEffect(() => {
    loadOrderLines();
  }, []);

  const latestOrderline = orderLines && orderLines.find((line) => !line.paid);

  if (!orderLines) {
    return <Spinner />;
  }

  return (
    <Page>
      <Pane>{ABOUT_WEBSHOP_PAYMENT}</Pane>
      {!latestOrderline || latestOrderline.orders.length === 0 ? (
        <Pane>
          <p>du har ingen varer i handlekorga di, kjøp noe daaaa</p>
        </Pane>
      ) : (
        <>
          <Pane>ayy lmao you owe us 1x orderline @ {latestOrderline.subtotal} NOK click the things below to pay</Pane>
          <Payment payment={latestOrderline.payment} />
        </>
      )}
    </Page>
  );
};
