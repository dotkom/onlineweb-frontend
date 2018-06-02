import { get } from 'common/utils/api';

const API_URL = '/api/v1/events'

export const getProfile = async () => {
  const data = await get(API_URL, { format: 'json' });
  const user = data.results[2];
  return user;
}
