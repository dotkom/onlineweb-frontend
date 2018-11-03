import React, { Component, Fragment } from 'react';
import { getHobbyGroups } from '../api';
import { IHobbyGroup } from '../models/HobbyGroup';
import HobbyGroup from './HobbyGroup';
import style from '../less/hobbygroups.less';

export interface IHobbyGroupListState {
  groups: IHobbyGroup[];
}

const sortHobbys = (a: IHobbyGroup, b: IHobbyGroup) => (a.priority || 0) - (b.priority || 0);

export default class HobbyGroupList extends Component<{}, IHobbyGroupListState> {
  public readonly state = { groups: [] } as IHobbyGroupListState;

  public async componentDidMount() {
    const { results } = await getHobbyGroups();
    this.setState({ groups: results });
  }

  public render() {
    const { groups } = this.state;
    return (
      <div className={style.container}>
        {groups.sort(sortHobbys).map((group) => (
          <HobbyGroup key={group.title} {...group} />
        ))}
      </div>
    );
  }
}
