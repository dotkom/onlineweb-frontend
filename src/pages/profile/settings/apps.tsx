import React from 'react';

import { ProfileWrapper } from 'profile';
import { SettingsWrapper } from 'profile/components/Settings';
import Apps from 'profile/components/Settings/Apps';


const SettingsAppsPage = () => {
  return (
    <ProfileWrapper>
      <SettingsWrapper>
        <Apps />
      </SettingsWrapper>
    </ProfileWrapper>
  );
};

export default SettingsAppsPage;
