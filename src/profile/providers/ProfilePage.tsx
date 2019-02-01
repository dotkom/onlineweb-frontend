import React, { createContext, ReactNode } from 'react';

import { IPublicProfile, IUserProfile } from 'profile/models/User';

export interface IProps {
  profile: IUserProfile | IPublicProfile;
  children: ReactNode;
}

const INITIAL_STATE = {} as IUserProfile | IPublicProfile;

export const ProfilePageContext = createContext(INITIAL_STATE);

export const ProfilePageProvider = ({ profile, children }: IProps) => {
  return <ProfilePageContext.Provider value={profile}>{children}</ProfilePageContext.Provider>;
};
