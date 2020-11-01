import React, { useEffect, useState } from 'react';

import ResponsiveImage from 'common/components/ResponsiveImage';
import Spinner from 'common/components/Spinner';
import { getOrderLines } from 'webshop/api';
import { IOrderLine } from 'webshop/models';

import { Payment } from '../Payment';
import style from '../Payment/payment.less';
import { CartError } from './CartError';
import { EmptyCart } from './EmptyCart';
import { selectIsLoggedIn } from 'authentication/selectors/authentication';
import { useSelector } from 'core/redux/hooks';

export const WebshopPayment = () => {
  const [orderLines, setOrderLines] = useState<IOrderLine[]>();
  const isLoggedIn = useSelector(selectIsLoggedIn());

  const loadOrderLines = async () => {
    const data = await getOrderLines();
    setOrderLines(data);
  };

  useEffect(() => {
    loadOrderLines();
  }, [isLoggedIn]);

  if (!orderLines) {
    return <Spinner />;
  }

  const latestOrderline = orderLines.find((line) => !line.paid);

  if (!latestOrderline || latestOrderline.orders.length === 0) {
    return <EmptyCart />;
  }

  if (!latestOrderline.payment) {
    return <CartError />;
  }

  return (
    <Payment payment={latestOrderline.payment} price={latestOrderline.payment.payment_prices[0]} showPayment>
      <div>
        {latestOrderline.orders.map((order) => (
          <div key={order.id} className={style.order}>
            {order.product.images.length ? (
              <ResponsiveImage image={order.product.images[0]} />
            ) : (
              <div className={style.image}>Det har ikke blitt lagt til et bilde for dette produktet enda</div>
            )}
            <div className={style.orderDetails}>
              <h3>
                {order.product.name} {order.size && <>({order.size.size})</>}
              </h3>
              <p>{order.product.description}</p>
              <p>
                {order.quantity} x {(order.product.price * 100) / 100}kr = {order.quantity * order.product.price}kr
              </p>
            </div>
          </div>
        ))}
      </div>
      <p className={style.subtotal}>
        <span>Totalt: </span>
        {latestOrderline.subtotal}kr
      </p>
    </Payment>
  );
};
