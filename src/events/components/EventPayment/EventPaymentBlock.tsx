import React, { FC } from 'react';
import { Button } from '@dotkomonline/design-system';
import { Link } from 'core/components/Router';
import style from '../DetailView/detail.less';
import { getPaymentEventUrl } from 'core/appUrls';

interface IProps {
  hasPaid?: boolean;
  eventId: number;
}

const EventPaymentBlock: FC<IProps> = ({ hasPaid, eventId }) => {
  return (
    <div className={`${style.eventPayment} ${style.fullBlock}`}>
      {hasPaid ? (
        <p>Du har betalt</p>
      ) : (
        <Link requireLogin={true} {...getPaymentEventUrl(eventId)}>
          <Button color="secondary">Gå til betaling</Button>
        </Link>
      )}
    </div>
  );
};

export default EventPaymentBlock;
