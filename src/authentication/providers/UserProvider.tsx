import React, { Component, createContext, Context } from 'react';
import { IAuthUser } from '../models/User';
import { User } from 'oidc-client';

export interface IUserContext {
  user?: IAuthUser;
  setUser: (auth: IAuthUser) => void;
}

const initialState: IUserContext = {
  setUser: (user: IAuthUser) => console.error('setUser called before UserProvider is initialized'),
};

export const UserContext = createContext(initialState);

class UserProvider extends Component<{}, IUserContext> {

  public state: IUserContext = {
    ...initialState,
    setUser: this.completeLogin,
  };

  public completeLogin = (user: IAuthUser) => {
    this.setState({ user });
  }

  public render() {
    const setUser = (user: User) => this.completeLogin(user);
    return(
      <UserContext.Provider value={{...this.state, setUser }}>
        { this.props.children }
      </UserContext.Provider>
    );
  }
}

export default UserProvider;
