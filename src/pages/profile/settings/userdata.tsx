import React from 'react';

import { ProfileWrapper } from 'profile';
import { SettingsWrapper } from 'profile/components/Settings';
import UserData from 'profile/components/Settings/UserData';


const SettingsUserDataPage = () => {
  return (
    <ProfileWrapper>
      <SettingsWrapper>
        <UserData />
      </SettingsWrapper>
    </ProfileWrapper>
  );
};

export default SettingsUserDataPage;
