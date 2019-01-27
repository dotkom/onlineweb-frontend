import React, { useContext } from 'react';

import { Page } from 'common/components/Panes';
import { UserProfileContext } from 'profile/providers/UserProfile';

import { MainProfile } from './MainProfile';
import style from './profile.less';

export const Profile = () => {
  const { user } = useContext(UserProfileContext);
  return (
    <div className={style.profileContainer}>
      <Page loading={!user}>{!!user ? <MainProfile /> : null}</Page>
    </div>
  );
};

export default Profile;
