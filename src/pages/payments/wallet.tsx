import React from 'react';

import { Wallet } from 'payments/components/Wallet';
import { useSelector } from 'core/redux/hooks';
import { selectIsLoggedIn } from 'authentication/selectors/authentication';

const PaymentWalletPage = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn());
  /** Should not be able to render this page without an authenticated user */
  if (!isLoggedIn) {
    return <p>Du må logge inn med brukeren din</p>;
  }

  return <Wallet />;
};

export default PaymentWalletPage;
