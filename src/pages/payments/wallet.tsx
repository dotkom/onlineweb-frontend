import React from 'react';

import { Wallet } from 'payments/components/Wallet';
import RequiresLogin from 'authentication/providers/RequiresLogin';

const PaymentWalletPage = () => {
  return (
    <RequiresLogin>
      <Wallet />
    </RequiresLogin>
  );
};

export default PaymentWalletPage;
