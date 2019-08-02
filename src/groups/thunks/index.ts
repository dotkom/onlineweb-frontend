import { Thunk } from 'core/redux/types';

import { deleteGroupMember, postGroupMember } from 'groups/api/groupMember';
import { deleteGroupRole, postGroupRole } from 'groups/api/groupRole';
import { deleteOnlineGroup, getAllOnlineGroups, patchOnlineGroup, getOnlineGroup } from 'groups/api/onlineGroup';
import { IGroupMemberCreate, IGroupRoleCreate, IOnlineGroupCreateOrUpdate } from 'groups/models/Groups';
import { GroupsActionType } from 'groups/reducers';

export const fetchAllGroupsAction: Thunk = () => {
  return async (dispatch) => {
    const groups = await getAllOnlineGroups();
    dispatch({ type: GroupsActionType.SET_ONLINE_GROUPS, groups });
  };
};

export const fetchGroupAction: Thunk = (groupId: number) => {
  return async (dispatch) => {
    console.log('testing');
    const group = await getOnlineGroup(groupId);
    console.log(group);
    dispatch({ type: GroupsActionType.SET_ONLINE_GROUPS, groups: [group] });
  };
};

export const updateGroupAction: Thunk = (groupId: number, groupData: IOnlineGroupCreateOrUpdate) => {
  return async (dispatch) => {
    const group = await patchOnlineGroup(groupId, groupData);
    dispatch({ type: GroupsActionType.UPDATE_ONLINE_GROUP, groupData: group, groupId });
  };
};

export const deleteGroupAction: Thunk = (groupId: number) => {
  return async (dispatch) => {
    await deleteOnlineGroup(groupId);
    dispatch({ type: GroupsActionType.DELETE_ONLINE_GROUP, groupId });
  };
};

export const addGroupMemberAction: Thunk = (memberData: IGroupMemberCreate) => {
  return async (dispatch) => {
    const member = await postGroupMember(memberData);
    dispatch({ type: GroupsActionType.ADD_ONLINE_GROUP_MEMBER, member });
  };
};

export const deleteGroupMemberAction: Thunk = (memberId: number) => {
  return async (dispatch) => {
    await deleteGroupMember(memberId);
    dispatch({ type: GroupsActionType.REMOVE_ONLINE_GROUP_MEMBER, memberId });
  };
};

export const addGroupRoleAction: Thunk = (roleData: IGroupRoleCreate) => {
  return async (dispatch) => {
    const role = await postGroupRole(roleData);
    dispatch({ type: GroupsActionType.ADD_ONLINE_GROUP_MEMBER_ROLE, role });
  };
};

export const deleteGroupRoleAction: Thunk = (roleId: number) => {
  return async (dispatch) => {
    await deleteGroupRole(roleId);
    dispatch({ type: GroupsActionType.REMOVE_ONLINE_GROUP_MEMBER_ROLE, roleId });
  };
};
