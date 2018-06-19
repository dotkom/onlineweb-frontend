import React, { Component, createContext, Context } from 'react';
import { AuthUser } from '../models/User';
import { logIn } from '../api';
import { initialState as IS } from '../reducers';

export interface IState {
  user: AuthUser;
  loggedIn: boolean;
}

const initialState = {
  user: new AuthUser(IS.user),
  loggedIn: false
}

export const UserContext = createContext(initialState);

class UserProvider extends Component<{}, IState> {
  state: IState = initialState;

  /**
   * @summary Obviously more logic is needed here.
   * @description try to log in via API, and set the state of the provider to logged in user.
   */
  async componentDidMount() {
    const data = await logIn('anon', 'user');
    const user = new AuthUser(data);
    this.setState({ user, loggedIn: true });
  }

  render() {
    return(
      <UserContext.Provider value={this.state}>
        { this.props.children }
      </UserContext.Provider>
    )
  }
}

export default UserProvider;
