import React from 'react';

import { ProfileWrapper } from 'profile';
import { SettingsWrapper } from 'profile/components/Settings';
import Penalties from 'profile/components/Settings/Penalties';

const SettingsPenaltiesPage = () => {
  return (
    <ProfileWrapper>
      <SettingsWrapper>
        <Penalties />
      </SettingsWrapper>
    </ProfileWrapper>
  );
};

export default SettingsPenaltiesPage;
