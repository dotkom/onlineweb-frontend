import { get, put } from 'common/utils/api';
import { IUserProfile } from '../models/User';
import { getUser } from 'authentication/api';
import { getCity } from './address';

/** Base URL for the profile API */
const API_URL = '/api/v1/profile/';

/**
 *
 */
export const getProfile = async (): Promise<IUserProfile | undefined> => {
  const user = await getUser();
  if (user) {
    const profile = await get<IUserProfile>(API_URL, { format: 'json' }, { user });
    if (profile.zip_code) {
      const postal = await getCity(profile.zip_code);
      return { ...profile, city: postal.result };
    }
    return profile;
  }
  return undefined;
};

export type PartialProfile = Partial<IUserProfile>;

export const putProfile = async (profileSettings: PartialProfile) => {
  const user = await getUser();
  const data = await put<IUserProfile>({ query: API_URL, data: profileSettings, options: { user } });
  return data;
};
