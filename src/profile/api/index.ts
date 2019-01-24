import { IAuthUser } from 'authentication/models/User';
import { get, put, withUser } from 'common/utils/api';
import { IFullProfileUser } from '../models/User';

/** Base URL for the profile API */
const API_URL = '/api/v1/profile/';

/**
 *
 */
export const getProfile = async (user: IAuthUser): Promise<IFullProfileUser> => {
  const data: IFullProfileUser = await get(API_URL, { format: 'json' }, withUser(user));
  return data;
};

export type PartialProfile = Partial<IFullProfileUser>;

export const putProfile = async (profileSettings: PartialProfile, user: IAuthUser): Promise<IFullProfileUser> => {
  const data = await put({ query: API_URL, data: profileSettings, options: { user } });
  return data;
};
