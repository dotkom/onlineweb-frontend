import { get, IAPIData } from 'common/utils/api';
import { IOnlineGroup } from '../models/onlinegroup';

const API_URL = '/api/v1/group/online-groups/';

export const getOnlineGroups = async () => {
  const data = await get<IAPIData<IOnlineGroup>>(API_URL, { format: 'json', page_size: 60 });
  return data.results;
};

export const getOnlineGroup = async (id: number) => {
  return await get<IOnlineGroup>(API_URL + id + '/', { format: 'json' });
};
