import { get } from 'common/utils/api';
import { IFullProfileUser } from '../models/User';

/** Base URL for the profile API */
const API_URL = '/api/v1/profile';

/**
 *
 */
export const getProfile = async (): Promise<IFullProfileUser> => {
  const data = await get(API_URL, { format: 'json' });
  // TODO: Create the API endpoint...
  const user = data.results[2];
  return user;
};
