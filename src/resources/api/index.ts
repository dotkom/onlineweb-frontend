import { get } from 'common/utils/api';

const API_URL = '/api/v1/resources/'

export const getResources = async () => {
  const data = await get(API_URL, { format: 'json' });
  return data;
}
