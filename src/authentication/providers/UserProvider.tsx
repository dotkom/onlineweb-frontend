import { User } from 'oidc-client';
import React, { Component, createContext } from 'react';
import { getUser, logOut } from '../api';
import { IAuthUser } from '../models/User';

export interface IUserContext {
  user?: IAuthUser;
  logout: () => void;
  setUser: (auth: IAuthUser) => void;
}

const initialState: IUserContext = {
  setUser: (_: IAuthUser) => new Error('setUser called before UserProvider is initialized'),
  logout: () => new Error('logout called before UserProvider is initialized'),
};

export const UserContext = createContext(initialState);

class UserProvider extends Component<{}, IUserContext> {
  public state: IUserContext = {
    ...initialState,
  };

  public completeLogin = (user: IAuthUser) => {
    this.setState({ user });
  };

  public logout = async () => {
    await logOut();
    this.setState({ user: undefined });
  };

  public async componentDidMount() {
    // check if user is already logged in
    const user = await getUser();
    if (user) {
      this.completeLogin(user);
    }
  }

  public render() {
    const setUser = (user: User) => this.completeLogin(user);
    const logout = this.logout;
    return (
      <UserContext.Provider value={{ ...this.state, setUser, logout }}>{this.props.children}</UserContext.Provider>
    );
  }
}

export default UserProvider;
