import { IAuthUser } from 'authentication/models/User';
import { get, withUser } from 'common/utils/api';
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
