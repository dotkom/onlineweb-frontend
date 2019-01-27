import React, { Component, createContext } from 'react';

import { searchUsers } from 'profile/api/search';
import { ISearchUser } from 'profile/models/User';

export interface IProps {}

export interface IState {
  search?: string;
  group?: string;
  range: [number, number];
  setSearch: (search: string) => void;
  setGroup: (group: string) => void;
  setRange: (range: [number, number]) => void;
  users: ISearchUser[];
  page: number;
  setPage: (page: number) => void;
}

const INITIAL_STATE: IState = {
  range: [1, 6],
  setSearch: (_) => {
    throw new Error('setSearch method not overwritten');
  },
  setGroup: (_) => {
    throw new Error('setGroup method not overwritten');
  },
  setRange: (_) => {
    throw new Error('setRange method not overwritten');
  },
  users: [],
  page: 1,
  setPage: (_) => {
    throw new Error('setPage method not overwritten');
  },
};

export const ProfileSearchContext = createContext(INITIAL_STATE);

export class ProfileSearchProvider extends Component<IProps, IState> {
  public state: IState = INITIAL_STATE;

  public setStateAndRefetch = async (newState: Partial<IState>) => {
    this.setState({ ...this.state, ...newState }, () => this.init());
  };

  public init = async () => {
    const { search = '', group, range, page } = this.state;
    const users = await searchUsers({ search, group, range, page });
    this.setState({ users });
  };

  public async componentDidMount() {
    this.init();
  }

  public setSearch = (search: string) => {
    this.setStateAndRefetch({ search });
  };

  public setGroup = (newGroup: string) => {
    const group = newGroup !== 'Alle grupper' ? newGroup : undefined;
    this.setStateAndRefetch({ group });
  };

  public setRange = (range: [number, number]) => {
    this.setStateAndRefetch({ range });
  };

  public setPage = (page: number) => {
    this.setStateAndRefetch({ page });
  };

  public render() {
    const { setSearch, setGroup, setRange, setPage } = this;
    const value = { ...this.state, setSearch, setGroup, setRange, setPage };
    return <ProfileSearchContext.Provider value={value}>{this.props.children}</ProfileSearchContext.Provider>;
  }
}

export default ProfileSearchProvider;
