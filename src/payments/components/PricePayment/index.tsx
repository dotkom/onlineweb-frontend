import { Page, Pane } from 'common/components/Panes';
import Spinner from 'common/components/Spinner';
import HttpError from 'core/components/errors/HttpError';
import { useSelector } from 'core/redux/hooks';
import { useToast } from 'core/utils/toast/useToast';
import React, { FC, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Type } from 'payments/reducers/price';
import { getPrice } from 'payments/api/price';
import { CreatePaymentRelation } from './CreatePaymentRelation';

interface IProps {
  paymentId: number;
  priceId: number;
}

export const PricePayment: FC<IProps> = ({ paymentId, priceId }) => {
  const [addMessage] = useToast({ type: 'error', duration: 12000 });

  const dispatch = useDispatch();
 
  const { price, fetching } = useSelector((state) => state.payments.price)

  const loadPrice = async () => {
    dispatch({ type: Type.SET_FETCHING_PRICE, status: true });
    
    try {
      dispatch({
        type: Type.SET_PAYMENT_PRICE,
        price:  await getPrice(priceId),
      });
    } catch (err) {
      addMessage(String(err));
    }
    
    dispatch({ type: Type.SET_FETCHING_PRICE, status: false });
  };

  useEffect(() => {
    loadPrice();
  }, []);

  console.log(fetching, price)
  if (fetching) {
    return <Spinner />;
  }

  if (!(price && price.id)) { 
    return <HttpError code={404} />;
  }

  return (
    <Page>
      <Pane>Pay up, bitch.</Pane>
      <p>Total: {price.price} kr</p>
      <p>Description of price: {price.description}</p>

      <CreatePaymentRelation />
    </Page>
  );
};
