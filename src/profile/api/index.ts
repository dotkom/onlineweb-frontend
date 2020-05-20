import { getUser } from 'authentication/api';
import { get, put } from 'common/utils/api';
import { IUserProfile } from '../models/User';

/** Base URL for the profile API */
const API_URL = '/api/v1/profile/';

/**
 *
 */
export const getProfile = async (): Promise<IUserProfile> => {
  const user = await getUser();
  const data = await get<IUserProfile>(API_URL, { format: 'json' }, { user });
  return data;
};

export type PartialProfile = Partial<IUserProfile>;

export const putProfile = async (profileSettings: PartialProfile) => {
  const user = await getUser();
  const data = await put<IUserProfile>({ query: API_URL, data: profileSettings, options: { user } });
  return data;
};
