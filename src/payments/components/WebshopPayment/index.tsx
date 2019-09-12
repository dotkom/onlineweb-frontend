import React, { useEffect, useState } from 'react';

import Spinner from 'common/components/Spinner';
import { IOrderLine } from 'profile/models/Orders';
import { getOrderLines } from 'webshop/api';
import { Payment } from '../Payment';

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
    <>
      {!latestOrderline || latestOrderline.orders.length === 0 ? (
        <p>du har ingen varer i handlekorga di, kjøp noe daaaa</p>
      ) : (
        <Payment payment={latestOrderline.payment} price={latestOrderline.payment.payment_prices[0]} showPayment={true}>
          <p>ayy lmao you owe us 1x orderline @ {latestOrderline.subtotal} NOK click the things below to pay</p>
        </Payment>
      )}
    </>
  );
};
