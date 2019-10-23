import { get, IAPIData } from 'common/utils/api';
import { IHobbyGroup } from 'hobbygroups/models/HobbyGroup';

const API_URL = '/api/v1/hobbys';

export const getHobbyGroups = async () => {
  const data = await get<IAPIData<IHobbyGroup>>(API_URL, { format: 'json', page_size: 60 });
  return data;
};
