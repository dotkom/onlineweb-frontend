import React, { Component, createContext, Context } from 'react';
import { IAuthUser } from '../models/User';
import { User } from 'oidc-client';

export interface IUserContext {
  user?: IAuthUser;
  setAuth: (auth: IAuthUser) => void;
}

const initialState: IUserContext = {
  setAuth: (user: IAuthUser) => console.error('setAuth called before UserProvider is initialized')
}

export const UserContext = createContext(initialState);

class UserProvider extends Component<{}, IUserContext> {
  completeLogin = (user: IAuthUser) => {
    this.setState({ user });
  }
  
  state: IUserContext = {
    ...initialState,
    setAuth: this.completeLogin
  };

  render() {
    const setAuth = (auth: User) => this.completeLogin(auth);
    return(
      <UserContext.Provider value={{...this.state, setAuth }}>
        { this.props.children }
      </UserContext.Provider>
    )
  }
}

export function injectUserContext<C extends React.ComponentClass<any>>(Component: C): C {
  return ((props: any) => 
    <UserContext.Consumer>
      {(context) => <Component {...props} auth={context} />}
    </UserContext.Consumer>) as any as C
}

export default UserProvider;
