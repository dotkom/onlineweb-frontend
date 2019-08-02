import { getUser } from 'authentication/api';
import { del, get, post } from 'common/utils/api';
import { IGroupRole, IGroupRoleCreate } from 'groups/models/Groups';

const API_URL = '/api/v1/group/roles';

export const getGroupRole = async (roleId: number) => {
  const user = await getUser();
  const role = await get<IGroupRole>(`${API_URL}/${roleId}/`, {}, { user });
  return role;
};

export const postGroupRole = async (role: IGroupRoleCreate) => {
  const user = await getUser();
  const result = await post<IGroupRole>(`${API_URL}/`, role, {}, { user });
  return result;
};

export const deleteGroupRole = async (roleId: number) => {
  const user = await getUser();
  const role = await del(`${API_URL}/${roleId}/`, {}, { user });
  return role;
};
