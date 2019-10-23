import React, { Component } from 'react';

import { getHobbyGroups } from '../api';
import { IHobbyGroup } from '../models/HobbyGroup';
import { Hobbies } from './Hobbies';

export interface IHobbyGroupListState {
  groups: IHobbyGroup[];
}

const sortHobbies = (a: IHobbyGroup, b: IHobbyGroup) => (b.priority || 0) - (a.priority || 0);
const filterHobbies = (group: IHobbyGroup) => group.active;

export default class HobbyGroupList extends Component<{}, IHobbyGroupListState> {
  public readonly state = { groups: [] } as IHobbyGroupListState;

  public async componentDidMount() {
    const { results } = await getHobbyGroups();
    this.setState({ groups: results });
  }

  public render() {
    const { groups } = this.state;
    const displayGroups = groups.filter(filterHobbies).sort(sortHobbies);

    return <Hobbies hobbies={displayGroups} />;
  }
}
