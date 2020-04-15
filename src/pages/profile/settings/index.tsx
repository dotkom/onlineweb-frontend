import React from 'react';

import { ProfileWrapper } from 'profile';
import { SettingsWrapper } from 'profile/components/Settings';
import SettingsInfo from 'profile/components/Settings/SettingsInfo';

const SettingsMainPage = () => {
  return (
    <ProfileWrapper>
      <SettingsWrapper>
        <SettingsInfo />
      </SettingsWrapper>
    </ProfileWrapper>
  );
};

export default SettingsMainPage;
