import React from 'react';

import { ProfileWrapper } from 'profile';
import OrderStatistics from 'profile/components/Statistics/Orders';

const OrderStatisticsPage = () => {
  return (
    <ProfileWrapper>
      <OrderStatistics />
    </ProfileWrapper>
  );
};

export default OrderStatisticsPage;
