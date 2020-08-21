import React, { useContext } from 'react';

import { Wallet } from 'payments/components/Wallet';
import { UserContext } from 'authentication/providers/UserProvider';

const PaymentWalletPage = () => {
  const { user } = useContext(UserContext);
  /** Should not be able to render this page without an authenticated user */
  if (!user) {
    return <p>Du må logge inn med brukeren din</p>;
  }

  return <Wallet />;
};

export default PaymentWalletPage;
