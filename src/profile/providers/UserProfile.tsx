import React, { ContextType, createContext } from 'react';

import { UserContext } from 'authentication/providers/UserProvider';
import { getProfile } from 'profile/api';
import { publicProfile } from 'profile/api/search';
import { IFullProfileUser, ISearchUser } from 'profile/models/User';

export interface IProps {
  userId?: number;
}

export interface IState {
  refetch: () => void;
  user?: IFullProfileUser | ISearchUser;
}

const INITIAL_STATE: IState = {
  refetch: () => {
    throw new Error('Refetch method was called without being overwritten');
  },
};

export const UserProfileContext = createContext(INITIAL_STATE);

export class UserProfileProvider extends React.Component<IProps, IState> {
  public static contextType = UserContext;
  public context!: ContextType<typeof UserContext>;
  public state: IState = INITIAL_STATE;

  public init = async () => {
    const auth = this.context;
    if (auth.user) {
      const { userId } = this.props;
      if (userId) {
        const user = await publicProfile(userId, auth.user);
        this.setState({ user });
      } else {
        const user = await getProfile(auth.user);
        this.setState({ user });
      }
    }
  };

  public refetch = async () => {
    await this.init();
  };

  public async componentDidMount() {
    this.init();
  }

  public render() {
    const { refetch } = this;
    const value = { ...this.state, refetch };
    return <UserProfileContext.Provider value={value}>{this.props.children}</UserProfileContext.Provider>;
  }
}

export default UserProfileProvider;
