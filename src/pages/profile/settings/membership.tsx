import React from 'react';

import { ProfileWrapper } from 'profile';
import { SettingsWrapper } from 'profile/components/Settings';
import Membership from 'profile/components/Settings/Membership';

const SettingsMembershipPage = () => {
  return (
    <ProfileWrapper>
      <SettingsWrapper>
        <Membership />
      </SettingsWrapper>
    </ProfileWrapper>
  );
};

export default SettingsMembershipPage;
