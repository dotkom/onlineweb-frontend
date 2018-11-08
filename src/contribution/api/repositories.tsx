import { get } from '../../common/utils/api';

export const getRepositories = async () => {
  try {
    const data = await get('/api/v1/repositories', { format: 'json' });
    return data;
  } catch (err) {
    /* tslint:disable-next-line: no-console */
    console.error(err);
  }
};
