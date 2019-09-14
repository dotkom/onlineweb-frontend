import React, { useEffect, useState } from 'react';

import Spinner from 'common/components/Spinner';
import { IOrderLine } from 'profile/models/Orders';
import { getOrderLines } from 'webshop/api';
import { Payment } from '../Payment';
import style from '../Payment/payment.less';
import { EmptyCart } from './EmptyCart';

export const WebshopPayment = () => {
  const [orderLines, setOrderLines] = useState<IOrderLine[]>();

  const loadOrderLines = async () => {
    const data = await getOrderLines();
    setOrderLines(data);
  };

  useEffect(() => {
    loadOrderLines();
  }, []);

  if (!orderLines) {
    return <Spinner />;
  }

  const latestOrderline = orderLines.find((line) => !line.paid);

  if (!latestOrderline || latestOrderline.orders.length === 0) {
    return <EmptyCart />;
  }

  const orders = latestOrderline.orders.map((order) => (
    <div key={order.id} className={style.order}>
      {order.product.images.length ? (
        <img src={order.product.images[0].thumb} alt={order.product.name} className={style.image} />
      ) : (
        <div className={style.image}>Det har ikke blitt lagt til et bilde for dette produktet enda</div>
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

  return (
    <Payment payment={latestOrderline.payment} price={latestOrderline.payment.payment_prices[0]} showPayment>
      <div>{orders}</div>
      <p className={style.subtotal}>
        <span>Totalt: </span>
        {latestOrderline.subtotal}kr
      </p>
    </Payment>
  );
};
