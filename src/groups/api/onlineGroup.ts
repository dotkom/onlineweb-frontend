import { getUser } from 'authentication/api';
import { del, get, IAPIData, patch, post } from 'common/utils/api';
import { IOnlineGroup, IOnlineGroupCreateOrUpdate } from 'groups/models/Groups';

const API_URL = '/api/v1/groups';

export const getAllOnlineGroups = async () => {
  const user = await getUser();
  const { results } = await get<IAPIData<IOnlineGroup>>(API_URL, { page_size: 60 }, { user });
  return results;
};

export const getOnlineGroup = async (groupId: number) => {
  const user = await getUser();
  const group = await get<IOnlineGroup>(API_URL + '/' + groupId, {}, { user });
  return group;
};

export const postOnlineGroup = async (group: IOnlineGroupCreateOrUpdate) => {
  const user = await getUser();
  const result = await post<IOnlineGroup>(API_URL, group, {}, { user });
  return result;
};

export const patchOnlineGroup = async (groupId: number, group: Partial<IOnlineGroupCreateOrUpdate>) => {
  const user = await getUser();
  const result = await patch<IOnlineGroup, Partial<IOnlineGroupCreateOrUpdate>>({
    query: API_URL + '/' + groupId,
    data: group,
    options: { user },
  });
  return result;
};

export const deleteOnlineGroup = async (groupId: number) => {
  const user = await getUser();
  const group = await del(API_URL + '/' + groupId, {}, { user });
  return group;
};
