import React from 'react';

import { ProfileWrapper } from 'profile';
import { SettingsWrapper } from 'profile/components/Settings';
import Mails from 'profile/components/Settings/Mails';

const SettingsMailPage = () => {
  return (
    <ProfileWrapper>
      <SettingsWrapper>
        <Mails />
      </SettingsWrapper>
    </ProfileWrapper>
  );
};

export default SettingsMailPage;
