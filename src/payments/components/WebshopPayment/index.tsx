import React, { useEffect, useState } from 'react';

import HttpError from 'core/components/errors/HttpError';

import { Page, Pane } from 'common/components/Panes';
import Spinner from 'common/components/Spinner';
import { IOrderLine } from 'profile/models/Orders';
import { getOrderLines } from 'webshop/api';
import { Payment } from '../Payment';
import style from '../Payment/payment.less';

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

  let webshopPayment;

  if (!orderLines) {
    webshopPayment = <Spinner />;
  } else if (!latestOrderline || latestOrderline.orders.length === 0) {
    webshopPayment = (
      <Page>
        <Pane>
          <p>
            Du har ingen varer i handlekurven din. Gå til <a href="https://online.ntnu.no/webshop">webshop</a> for å
            kjøpe varer!
          </p>
        </Pane>
      </Page>
    );
  } else if (latestOrderline) {
    const orders = latestOrderline.orders.map((order) => (
      <div key={order.id} className={style.order}>
        {order.product.images.length ? (
          <img src={order.product.images[0].thumb} alt={order.product.name} className={style.image} />
        ) : (
          <div className={style.image}>Prokom har ikke lagt til et bilde for dette produktet enda</div>
        )}
        <div className={style.orderDetails}>
          <h3>
            {order.product.name} {order.size && <>({order.size})</>}
          </h3>
          <p>{order.product.description}</p>
          <p>
            {order.quantity} x {(order.product.price * 100) / 100}kr = {order.quantity * order.product.price}kr
          </p>
        </div>
      </div>
    ));
    webshopPayment = (
      <Payment payment={latestOrderline.payment} price={latestOrderline.payment.payment_prices[0]} showPayment>
        <div>{orders}</div>
        <p className={style.subtotal}>
          <span>Totalt: </span>
          {latestOrderline.subtotal}kr
        </p>
      </Payment>
    );
  } else {
    webshopPayment = <HttpError code={404} />;
  }

  return webshopPayment;
};
