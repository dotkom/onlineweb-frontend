import { Reducer } from 'redux';

import { IGroupMember, IGroupRole, IOnlineGroup } from 'groups/models/Groups';

export interface IGroupsState {
  groups: Record<number, IOnlineGroup>;
  groupMembers: Record<number, IGroupMember>;
  groupRoles: Record<number, IGroupRole>;
}

const INITIAL_STATE: IGroupsState = {
  groups: {},
  groupMembers: {},
  groupRoles: {},
};

export enum GroupsActionType {
  SET_ONLINE_GROUPS = 'SET_ONLINE_GROUPS',
  DELETE_ONLINE_GROUP = 'DELETE_ONLINE_GROUP',
  UPDATE_ONLINE_GROUP = 'UPDATE_ONLINE_GROUP',
  ADD_ONLINE_GROUP_MEMBER = 'ADD_ONLINE_GROUP_MEMBER',
  REMOVE_ONLINE_GROUP_MEMBER = 'REMOVE_ONLINE_GROUP_MEMBER',
  ADD_ONLINE_GROUP_MEMBER_ROLE = 'ADD_ONLINE_GROUP_MEMBER_ROLE',
  REMOVE_ONLINE_GROUP_MEMBER_ROLE = 'REMOVE_ONLINE_GROUP_MEMBER_ROLE',
}

interface IGroupsAction {
  type: GroupsActionType;
}

interface ISetGroupsAction extends IGroupsAction {
  type: GroupsActionType.SET_ONLINE_GROUPS;
  groups: IOnlineGroup[];
}

interface IDeleteGroupAction extends IGroupsAction {
  type: GroupsActionType.DELETE_ONLINE_GROUP;
  groupId: number;
}

interface IUpdateGroupAction extends IGroupsAction {
  type: GroupsActionType.UPDATE_ONLINE_GROUP;
  groupId: number;
  groupData: Partial<IOnlineGroup>;
}

interface IAddGroupMember extends IGroupsAction {
  type: GroupsActionType.REMOVE_ONLINE_GROUP_MEMBER;
  memberId: number;
}

interface IRemoveGroupMember extends IGroupsAction {
  type: GroupsActionType.ADD_ONLINE_GROUP_MEMBER;
  member: IGroupMember;
}

interface IAddGroupMemberRole extends IGroupsAction {
  type: GroupsActionType.ADD_ONLINE_GROUP_MEMBER_ROLE;
  role: IGroupRole;
}

interface IRemoveGroupMemberRole extends IGroupsAction {
  type: GroupsActionType.REMOVE_ONLINE_GROUP_MEMBER_ROLE;
  roleId: number;
}

export type GroupsAction =
  | ISetGroupsAction
  | IDeleteGroupAction
  | IUpdateGroupAction
  | IAddGroupMember
  | IRemoveGroupMember
  | IAddGroupMemberRole
  | IRemoveGroupMemberRole;

export const groupsReducer: Reducer<IGroupsState, GroupsAction> = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GroupsActionType.SET_ONLINE_GROUPS: {
      const groups = action.groups.reduce<Record<number, IOnlineGroup>>(
        (acc, group) => ({ ...acc, [group.group.id]: group }),
        {}
      );
      const groupMembers = action.groups
        .flatMap((group) => group.members)
        .reduce<Record<number, IGroupMember>>((acc, member) => ({ ...acc, [member.id]: member }), {});
      const groupRoles = action.groups
        .flatMap((group) => group.members)
        .flatMap((member) => member.roles)
        .reduce<Record<number, IGroupRole>>((acc, role) => ({ ...acc, [role.id]: role }), {});
      return {
        ...state,
        groups: { ...state.groups, ...groups },
        groupMembers: { ...state.groupMembers, groupMembers },
        groupRoles: { ...state.groupRoles, ...groupRoles },
      };
    }

    case GroupsActionType.UPDATE_ONLINE_GROUP: {
      return {
        ...state,
        groups: {
          ...state.groups,
          [action.groupId]: { ...state.groups[action.groupId], ...action.groupData },
        },
      };
    }
    case GroupsActionType.DELETE_ONLINE_GROUP: {
      const allGroups = new Map(Object.entries(state.groups));
      allGroups.delete(String(action.groupId));
      return {
        ...state,
        groups: Object.fromEntries(allGroups.entries()),
      };
    }
    case GroupsActionType.ADD_ONLINE_GROUP_MEMBER: {
      return {
        ...state,
        groupMembers: {
          ...state.groupMembers,
          [action.member.id]: action.member,
        },
      };
    }
    case GroupsActionType.REMOVE_ONLINE_GROUP_MEMBER: {
      const allMembers = new Map(Object.entries(state.groupMembers));
      allMembers.delete(String(action.memberId));
      return {
        ...state,
        groupMembers: Object.fromEntries(allMembers.entries()),
      };
    }
    case GroupsActionType.ADD_ONLINE_GROUP_MEMBER_ROLE: {
      return {
        ...state,
        groupRoles: {
          ...state.groupRoles,
          [action.role.id]: action.role,
        },
      };
    }
    case GroupsActionType.REMOVE_ONLINE_GROUP_MEMBER_ROLE: {
      const allRoles = new Map(Object.entries(state.groupRoles));
      allRoles.delete(String(action.roleId));
      return {
        ...state,
        groupRoles: Object.fromEntries(allRoles.entries()),
      };
    }
  }
  return state;
};
