import React,  { Component, Fragment } from 'react';
import { getHobbyGroups } from '../api';
import { IHobbyGroup } from '../models/HobbyGroup';
import HobbyGroup from './HobbyGroup';

export interface IHobbyGroupListState {
  groups: IHobbyGroup[];
};

export default class HobbyGroupList extends Component<{}, IHobbyGroupListState> {
  readonly state = { groups: [] } as IHobbyGroupListState;

  async componentDidMount() {
    const { results } = await getHobbyGroups();
    this.setState({ groups: results });
  };

  render() {
    const { groups } = this.state;
    return(
      <Fragment>
        {this.state.groups.map((group, index) => {
          return index % 2 === 0 ? 
            <div className="row" key={group.title + groups[index].title}>
              <HobbyGroup {...group} />
              <HobbyGroup {...groups[index + 1]} />
            </div> : undefined
        })}
      </Fragment>
    );
  };
};
