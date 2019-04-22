import { get, IAPIData } from 'common/utils/api';
import { IResource } from 'resources/models/Resource';

const API_URL = '/api/v1/resources/';

export const getResources = async () => {
  const data = await get<IAPIData<IResource>>(API_URL, { format: 'json' });
  return data;
};
