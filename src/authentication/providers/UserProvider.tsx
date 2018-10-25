import React, { Component, createContext, Context } from 'react';
import { IAuthUser } from '../models/User';
import { User } from 'oidc-client';

export interface IUserContext {
  user?: IAuthUser;
  setAuth: (auth: IAuthUser) => void;
}

const initialState: IUserContext = {
  setAuth: (user: IAuthUser) => console.error('setAuth called before UserProvider is initialized'),
};

export const UserContext = createContext(initialState);

class UserProvider extends Component<{}, IUserContext> {

  public state: IUserContext = {
    ...initialState,
    setAuth: this.completeLogin,
  };

  public completeLogin = (user: IAuthUser) => {
    this.setState({ user });
  }

  public render() {
    const setAuth = (auth: User) => this.completeLogin(auth);
    return(
      <UserContext.Provider value={{...this.state, setAuth }}>
        { this.props.children }
      </UserContext.Provider>
    );
  }
}

export function injectUserContext<C extends React.ComponentClass<any>>(Comp: C): C {
  return ((props: any) =>
    <UserContext.Consumer>
      {(context) => <Comp {...props} auth={context} />}
    </UserContext.Consumer>) as any as C;
}

export default UserProvider;
