import { get, IAPIData } from 'common/utils/api';

import { IRepository } from 'contribution/models/Repository';

export const getRepositories = async () => {
  const data = await get<IAPIData<IRepository>>('/api/v1/repositories', { format: 'json' });
  return data;
};
