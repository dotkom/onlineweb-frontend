import { User } from 'oidc-client';
import React, { Component, createContext } from 'react';
import { IAuthUser } from '../models/User';

export interface IUserContext {
  user?: IAuthUser;
  setUser: (auth: IAuthUser) => void;
}

const initialState: IUserContext = {
  setUser: (_: IAuthUser) => new Error('setUser called before UserProvider is initialized'),
};

export const UserContext = createContext(initialState);

class UserProvider extends Component<{}, IUserContext> {
  public state: IUserContext = {
    ...initialState,
  };

  public completeLogin = (user: IAuthUser) => {
    this.setState({ user });
  };

  public render() {
    const setUser = (user: User) => this.completeLogin(user);
    return <UserContext.Provider value={{ ...this.state, setUser }}>{this.props.children}</UserContext.Provider>;
  }
}

export default UserProvider;
