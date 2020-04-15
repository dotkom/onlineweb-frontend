import React from 'react';

import { ProfileWrapper } from 'profile';
import { SettingsWrapper } from 'profile/components/Settings';
import Privacy from 'profile/components/Settings/Privacy';

const SettingsPrivacyPage = () => {
  return (
    <ProfileWrapper>
      <SettingsWrapper>
        <Privacy />
      </SettingsWrapper>
    </ProfileWrapper>
  );
};

export default SettingsPrivacyPage;
