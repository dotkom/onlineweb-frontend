import React, { FC, FormEvent } from 'react';
import { CardElement } from '@stripe/react-stripe-js';

import { PaymentMethodDescription } from '../PaymentMethodDescription';
import style from './card.less';

export interface IProps {
  onSubmit: () => void;
  processing: boolean;
}

export const CardPayment: FC<IProps> = ({ onSubmit, processing }) => {
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit();
  };

  return (
    <div className={style.cardPayment}>
      <PaymentMethodDescription>Betal med kort</PaymentMethodDescription>
      <form onSubmit={handleSubmit} className={style.form}>
        <div className={style.subForm}>
          <CardElement style={{ base: { fontSize: '18px' } }} />
          <button type="submit" disabled={processing} className={style.payButton}>
            Betal
          </button>
        </div>
      </form>
    </div>
  );
};
