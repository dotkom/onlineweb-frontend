import React, { Component, ContextType, createContext } from 'react';

import { UserContext } from 'authentication/providers/UserProvider';
import { searchUsers } from 'profile/api/search';
import { IPublicProfile } from 'profile/models/User';

export interface IProps {}

export interface IState {
  search?: string;
  group?: string;
  range: [number, number];
  setSearch: (search: string) => void;
  setGroup: (group: string) => void;
  setRange: (range: [number, number]) => void;
  users: IPublicProfile[];
  page: number;
  nextPage: () => void;
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
  nextPage: () => {
    throw new Error('nextPage method not overwritten');
  },
};

export const ProfileSearchContext = createContext(INITIAL_STATE);

export class ProfileSearchProvider extends Component<IProps, IState> {
  public static contextType = UserContext;
  public context!: ContextType<typeof UserContext>;

  public state: IState = INITIAL_STATE;

  public setStateAndRefetch = async (newState: Partial<IState>) => {
    this.setState({ ...this.state, ...newState }, () => this.init());
  };

  public init = async () => {
    const { user } = this.context;
    if (user) {
      const { search = '', group, range, page } = this.state;
      const users = await searchUsers({ search, group, range, page }, user);
      this.setState({ users, page: 1 });
    }
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

  public nextPage = () => {
    const { page } = this.state;
    this.setState({ page: page + 1 }, () => this.fetchNextPage());
  };

  public fetchNextPage = async () => {
    const { user } = this.context;
    if (user) {
      const { search = '', group, range, page, users } = this.state;
      const newUsers = await searchUsers({ search, group, range, page }, user);
      this.setState({ users: [...users, ...newUsers] });
    }
  };

  public render() {
    const { setSearch, setGroup, setRange, nextPage } = this;
    const value = { ...this.state, setSearch, setGroup, setRange, nextPage };
    return <ProfileSearchContext.Provider value={value}>{this.props.children}</ProfileSearchContext.Provider>;
  }
}

export default ProfileSearchProvider;
