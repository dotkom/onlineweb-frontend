import { faStripe } from '@fortawesome/free-brands-svg-icons/faStripe';
import { faMoneyBillAlt } from '@fortawesome/free-regular-svg-icons/faMoneyBillAlt';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';
import React, { FC } from 'react';

import { PaymentType } from 'payments/models/Payment';

export interface IProps {
  type: PaymentType;
}

const getPaymentTypeIcon = (type: PaymentType) => {
  switch (type) {
    case 'cash':
      return <Icon icon={faMoneyBillAlt} title="Kontant" size="2x" />;
    case 'stripe':
      return <Icon icon={faStripe} title="Stripe" size="2x" />;
  }
};

export const TypeIcon: FC<IProps> = ({ type }) => {
  return getPaymentTypeIcon(type);
};
