import React from 'react';

import { ProfileWrapper } from 'profile';
import { SettingsWrapper } from 'profile/components/Settings';
import Notifications from 'profile/components/Settings/Notifications';

const SettingsNotificationsPage = () => {
  return (
    <ProfileWrapper>
      <SettingsWrapper>
        <Notifications />
      </SettingsWrapper>
    </ProfileWrapper>
  );
};

export default SettingsNotificationsPage;
