import React, { FC, useEffect } from 'react';
import { IOnlineGroup, RoleType, IGroupMember } from 'groups/models/Groups';
import { useSelector, useDispatch, useThunk } from 'core/redux/hooks';
import { State } from 'core/redux/types';
import { Table } from 'common/components/Table';
import { fetchGroupAction } from 'groups/thunks';
import { SelectMultiple, ISelectable } from 'common/components/Forms/SelectMultiple';
import { ValueType } from 'react-select/lib/types';
import { postGroupRole, deleteGroupRole } from 'groups/api/groupRole';

interface IProps {
  groupId: number;
}

const ROLE_TYPES = [
  RoleType.CHIEF_EDITOR,
  RoleType.DEPUTY_LEADER,
  RoleType.LEADER,
  RoleType.MEMBER,
  RoleType.ON_LEAVE,
  RoleType.RETIRED,
  RoleType.TREASURER,
];

const getRoleName = (roleType: RoleType): string => {
  switch (roleType) {
    case RoleType.TREASURER:
      return 'Øknomiansvarlig';
    case RoleType.RETIRED:
      return 'Pensjonert';
    case RoleType.ON_LEAVE:
      return 'Permittert';
    case RoleType.MEMBER:
      return 'Medlem';
    case RoleType.CHIEF_EDITOR:
      return 'Redaktør';
    case RoleType.DEPUTY_LEADER:
      return 'Nestleder';
    case RoleType.LEADER:
      return 'Leder';
  }
};

const getRoleColor = (roleType: RoleType): string => {
  switch (roleType) {
    case RoleType.TREASURER:
      return '#D4AF37';
    case RoleType.RETIRED:
      return '#c4c4c4';
    case RoleType.ON_LEAVE:
      return '#c4c4c4';
    case RoleType.MEMBER:
      return '#c4c4c4';
    case RoleType.CHIEF_EDITOR:
      return '#c4c4c4';
    case RoleType.DEPUTY_LEADER:
      return '#C0C0C0';
    case RoleType.LEADER:
      return '#FFD700';
  }
};

const ROLE_TYPE_SELECTABLES: Array<ISelectable<RoleType, string>> = ROLE_TYPES.map((role) => ({
  label: getRoleName(role),
  value: role,
}));

export const DetailView: FC<IProps> = ({ groupId }) => {
  const init = useThunk(fetchGroupAction(groupId));
  const group = useSelector(selectGroupById(groupId));

  useEffect(() => {
    init();
  }, [groupId]);

  if (!group) {
    return null;
  }

  return (
    <div>
      <p>{group.name_long}</p>
      <Table headers={['Navn', 'Roller']}>
        {group.members.map((member) => (
          <GroupMember key={member.id} member={member} />
        ))}
      </Table>
    </div>
  );
};

const selectGroupById = (groupId: number) => {
  return (state: State) => {
    const { groups } = state.groups;
    return groupId in groups ? groups[groupId] : null;
  };
};

interface IGroupMemberProps {
  member: IGroupMember;
}

const GroupMember: FC<IGroupMemberProps> = ({ member }) => {
  const onRolesChange = async (roleTypes: RoleType[]) => {
    const currentRoleTypes = member.roles.map((role) => role.role_type);
    const newRoleTypes = roleTypes.filter((roleType) => !currentRoleTypes.includes(roleType));
    const newRoles = await Promise.all(
      newRoleTypes.map(async (roleType) => {
        return await postGroupRole({ membership: member.id, role_type: roleType });
      })
    );
    const removedRoles = member.roles.filter((role) => !roleTypes.includes(role.role_type));
    const deletedRoles = await Promise.all(
      removedRoles.map(async (role) => {
        return await deleteGroupRole(role.id);
      })
    );
  };
  return (
    <tr key={member.id}>
      <td>{member.user.first_name}</td>
      <td>
        <SelectRoleType selected={member.roles.map((role) => role.role_type)} onChange={onRolesChange} />
      </td>
    </tr>
  );
};

interface ISelectRoleTypeProps {
  selected: RoleType[];
  onChange: (roles: RoleType[]) => void;
}

const SelectRoleType: FC<ISelectRoleTypeProps> = ({ selected, onChange }) => {
  const onRoleChange = (value: ValueType<ISelectable<RoleType, string>>) => {
    if (value !== null) {
      const actualValue = value as Array<{ value: RoleType; label: RoleType }>;
      const roleTypes = actualValue.map((e) => e.value);
      if (roleTypes.length > 0) {
        onChange(roleTypes);
      } else {
        onChange([]);
      }
    }
  };
  return (
    <SelectMultiple<RoleType, string>
      placeholder="Velg roller"
      selectOptions={ROLE_TYPE_SELECTABLES}
      selected={selected.map((role) => ({
        label: getRoleName(role),
        value: role,
      }))}
      getColor={(roleType) => getRoleColor(roleType)}
      onChange={onRoleChange}
    />
  );
};
