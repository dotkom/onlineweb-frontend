import React, { useContext } from 'react';

import { Page } from 'common/components/Panes';
import { ProfilePageProvider } from 'profile/providers/ProfilePage';
import { UserProfileContext } from 'profile/providers/UserProfile';

import { MainProfile } from './MainProfile';

export const Profile = () => {
  const { user } = useContext(UserProfileContext);
  return (
    <Page loading={!user}>
      {!!user ? (
        <ProfilePageProvider profile={user}>
          <MainProfile />
        </ProfilePageProvider>
      ) : null}
    </Page>
  );
};

export default Profile;
