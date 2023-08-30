import React from 'react';

import { ProfileWrapper } from 'profile';
import { SettingsWrapper } from 'profile/components/Settings';
import Calendar from 'profile/components/Settings/Calendar';

const SettingsCalendarPage = () => {
  return (
    <ProfileWrapper>
      <SettingsWrapper>
        <Calendar />
      </SettingsWrapper>
    </ProfileWrapper>
  );
};

export default SettingsCalendarPage;
