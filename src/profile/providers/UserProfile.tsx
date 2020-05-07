import React, { createContext } from 'react';

import { getProfile } from 'profile/api';
import { IUserProfile } from 'profile/models/User';

interface IState {
  refetch: () => void;
  user?: IUserProfile;
}

const INITIAL_STATE: IState = {
  refetch: () => {
    throw new Error('Refetch method was called without being overwritten');
  },
};

export const UserProfileContext = createContext(INITIAL_STATE);

export class UserProfileProvider extends React.Component<{}, IState> {
  public state: IState = INITIAL_STATE;

  public init = async () => {
    const user = await getProfile();
    this.setState({ user });
  };

  public refetch = async () => {
    await this.init();
  };

  public async componentDidMount() {
    this.init();
  }

  public componentDidUpdate() {
    if (!this.state.user) {
      this.init();
    }
  }

  public render() {
    const { refetch } = this;
    const value = { ...this.state, refetch };
    return <UserProfileContext.Provider value={value}>{this.props.children}</UserProfileContext.Provider>;
  }
}

export default UserProfileProvider;
