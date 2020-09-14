import React, { FC } from 'react';

import MainMenu from './components/MainMenu';
import RequiresLogin from 'authentication/providers/RequiresLogin';

export const ProfileWrapper: FC = ({ children }) => {
  return (
    <RequiresLogin>
      <MainMenu />
      {children}
    </RequiresLogin>
  );
};
