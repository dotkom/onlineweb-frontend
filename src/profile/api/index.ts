import { IAuthUser } from 'authentication/models/User';
import { get, put } from 'common/utils/api';
import { IUserProfile } from '../models/User';

/** Base URL for the profile API */
const API_URL = '/api/v1/profile/';

/**
 *
 */
export const getProfile = async (user: IAuthUser): Promise<IUserProfile> => {
  const data: IUserProfile = await get(API_URL, { format: 'json' }, { user });
  return data;
};

export type PartialProfile = Partial<IUserProfile>;

export const putProfile = async (profileSettings: PartialProfile, user: IAuthUser): Promise<IUserProfile> => {
  const data = await put({ query: API_URL, data: profileSettings, options: { user } });
  return data;
};
