import React, { createContext, useState, useEffect } from 'react';

import { getProfile } from 'profile/api';
import { IUserProfile } from 'profile/models/User';
import { useSelector } from 'react-redux';
import { selectIsLoggedIn } from 'authentication/selectors/authentication';

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
  const isLoggedIn = useSelector(selectIsLoggedIn());
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
  }, [isLoggedIn]);

  const value = { user: userProfile, refetch };
  return <UserProfileContext.Provider value={value}>{props.children}</UserProfileContext.Provider>;
};

export default UserProfileProvider;
