import { get } from 'common/utils/api';

const API_URL = '/api/v1/hobbys';

export const getHobbyGroups = async () => {
  try {
    const data = await get(API_URL, { format: 'json' });
    return data;
  } catch (err) {
    console.error(err);
  }
};
