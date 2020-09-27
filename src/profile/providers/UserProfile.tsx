import React, { createContext, useState, useEffect } from 'react';

import { getProfile } from 'profile/api';
import { IUserProfile } from 'profile/models/User';
import { useSession } from 'next-auth/client';

interface IState {
  refetch: () => void;
  user?: IUserProfile;
}

const INITIAL_STATE: IState = {
  refetch: () => {
    throw new Error('Refetch method was called without being overwritten');
  },
};

export const UserProfileContext = createContext(INITIAL_STATE);

export const UserProfileProvider: React.FC = (props) => {
  const [session] = useSession();
  const [userProfile, setUserProfile] = useState<IUserProfile | undefined>(undefined);

  const init = async () => {
    const user = await getProfile();
    setUserProfile(user);
  };

  const refetch = async () => {
    await init();
  };

  useEffect(() => {
    init();
  }, [session]);

  const value = { user: userProfile, refetch };
  return <UserProfileContext.Provider value={value}>{props.children}</UserProfileContext.Provider>;
};

export default UserProfileProvider;
