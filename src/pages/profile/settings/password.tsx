import React from 'react';

import { ProfileWrapper } from 'profile';
import { SettingsWrapper } from 'profile/components/Settings';
import Password from 'profile/components/Settings/Password';

const SettingsPasswordPage = () => {
  return (
    <ProfileWrapper>
      <SettingsWrapper>
        <Password />
      </SettingsWrapper>
    </ProfileWrapper>
  );
};

export default SettingsPasswordPage;
