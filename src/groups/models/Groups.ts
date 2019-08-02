import IResponsiveImage from 'common/models/ResponsiveImage';

interface IUserName {
  id: number;
  first_name: string;
  last_name: string;
}

/** Default Django implementation of a group */
export interface IGroup {
  id: number;
  name: string;
}

export enum GroupType {
  COMMITTEE = 'committee',
  NODE_COMMITTEE = 'node_committee',
  HOBBY_GROUP = 'hobby_group',
  OTHER = 'other',
}

export enum RoleType {
  LEADER = 'leader',
  DEPUTY_LEADER = 'deputy_leader',
  TREASURER = 'treasurer',
  MEMBER = 'member',
  RETIRED = 'retired',
  ON_LEAVE = 'on_leave',
  CHIEF_EDITOR = 'chief_editor',
}

export interface IGroupRole {
  id: number;
  role_type: RoleType;
  added: string; // Date
  verbose_name: string;
}

export interface IGroupRoleCreate {
  membership: number;
  role_type: RoleType;
}

export interface IGroupMember {
  id: number;
  user: IUserName;
  added: string; // Date
  roles: IGroupRole[];
}

export interface IGroupMemberCreate {
  user: number;
  group: number;
}

export interface IOnlineGroup {
  image: IResponsiveImage | null;
  name_short: string;
  name_long: string;
  description_long: string;
  description_short: string;
  email: string;
  created: string; // Date
  group_type: GroupType;
  verbose_type: string;
  group: IGroup;
  members: IGroupMember[];
}

export interface IOnlineGroupCreateOrUpdate {
  group: number;
  image: number;
  name_short: string;
  name_long: string;
  description_short: string;
  description_long: string;
  email: string;
  group_type: GroupType;
}
