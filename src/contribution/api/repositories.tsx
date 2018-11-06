import { get } from '../../common/utils/api';

export const getRepositories = async () => {
  try {
    const data = await get('/api/v1/repositories', { format: 'json' });
    console.log(data);
    return data;
  } catch (err) {
    console.error(err);
  }
};
