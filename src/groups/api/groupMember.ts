import { getUser } from 'authentication/api';
import { del, get, post } from 'common/utils/api';
import { IGroupMember, IGroupMemberCreate } from 'groups/models/Groups';

const API_URL = '/api/v1/group/members';

export const getGroupMember = async (memberId: number) => {
  const user = await getUser();
  const member = await get<IGroupMember>(API_URL + '/' + memberId, {}, { user });
  return member;
};

export const postGroupMember = async (member: IGroupMemberCreate) => {
  const user = await getUser();
  const result = await post<IGroupMember>(API_URL, member, {}, { user });
  return result;
};

export const deleteGroupMember = async (memberId: number) => {
  const user = await getUser();
  const member = await del(API_URL + '/' + memberId, {}, { user });
  return member;
};
