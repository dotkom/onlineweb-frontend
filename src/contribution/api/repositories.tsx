import { get } from '../../common/utils/api';

export const getRepositories = async () => {
  try {
    const data = await get('/api/v1/repositories', { format: 'json' });
    return data;
  } catch (err) {
    console.error(err);
  }
};
