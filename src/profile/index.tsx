import React, { FC } from 'react';

import MainMenu from './components/MainMenu';

export const ProfileWrapper: FC = ({ children }) => {
  return (
    <>
      <MainMenu />
      {children}
    </>
  );
};
