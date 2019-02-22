import React, { useContext } from 'react';

import { UserProfileContext } from 'profile/providers/UserProfile';

import NumberStat from './NumberStat';

export const AccountBalance = () => {
  const { user } = useContext(UserProfileContext);
  return user ? <NumberStat name="Saldo" value={`${user.saldo} Kr`} /> : null;
};
