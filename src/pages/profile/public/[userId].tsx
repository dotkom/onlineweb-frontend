import { useRouter } from 'next/router';
import React from 'react';

import { ProfileWrapper } from 'profile';
import { PublicProfile } from 'profile/components/Profile/PublicProfile';

const PublicProfilePage = () => {
  const router = useRouter();
  const userId = Number(router.query.userId);
  return (
    <ProfileWrapper>
      <PublicProfile profileId={userId} />
    </ProfileWrapper>
  );
};

export default PublicProfilePage;
