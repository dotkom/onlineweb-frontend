import React from 'react';

import { ProfileWrapper } from 'profile';
import { SettingsWrapper } from 'profile/components/Settings';
import AccessCard from 'profile/components/Settings/AccessCard';

const SettingsAccessCardPage = () => {
  return (
    <ProfileWrapper>
      <SettingsWrapper>
        <AccessCard />
      </SettingsWrapper>
    </ProfileWrapper>
  );
};

export default SettingsAccessCardPage;
