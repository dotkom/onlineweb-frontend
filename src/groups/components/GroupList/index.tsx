import React, { FC, useEffect } from 'react';

import { useSelector, useThunk } from 'core/redux/hooks';
import { GroupType, IOnlineGroup } from 'groups/models/Groups';
import { fetchAllGroupsAction } from 'groups/thunks';

import { GroupCard } from '../GroupCard';

import style from './container.less';

export const GroupList: FC = () => {
  const fetchGroups = useThunk(fetchAllGroupsAction());
  const groups = useSelector((state) => Object.values(state.groups.groups));
  const committees = groups.filter((group) => group.group_type === GroupType.COMMITTEE);
  const nodeCommittees = groups.filter((group) => group.group_type === GroupType.NODE_COMMITTEE);
  const hobbyGroups = groups.filter((group) => group.group_type === GroupType.HOBBY_GROUP);
  const otherGroups = groups.filter((group) => group.group_type === GroupType.OTHER);

  useEffect(() => {
    fetchGroups();
  }, []);

  return (
    <div>
      <p>Grupper</p>
      <GroupTypeList name="Komiteer" groups={committees} />
      <GroupTypeList name="Nodekomiteer" groups={nodeCommittees} />
      <GroupTypeList name="Interessegrupper" groups={hobbyGroups} />
      <GroupTypeList name="Annet" groups={otherGroups} />
    </div>
  );
};

interface IGroupTypeListProps {
  name: string;
  groups: IOnlineGroup[];
}

const GroupTypeList: FC<IGroupTypeListProps> = ({ groups, name }: IGroupTypeListProps) => {
  return groups.length ? (
    <>
      <p>{name}</p>
      <div className={style.groupsContainer}>
        {groups.map((group) => (
          <GroupCard key={group.group.id} group={group} />
        ))}
      </div>
    </>
  ) : null;
};
