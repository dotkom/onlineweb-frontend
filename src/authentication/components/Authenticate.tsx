import React, { Fragment } from 'react';
import { IGroup } from 'core/models/Group';
import { connect } from 'react-redux';
//import { IState } from '../reducers';
import { Permission } from 'core/models/Permission';
import { UserContext } from '../providers/UserProvider';
import { AuthUser } from '../models/User';
/*
export interface Props extends IState {
  user: AuthUser
  children: JSX.Element;
  alt?: JSX.Element;
  authentication: IGroup | Permission;
}

export const mapStateToProps = (state: IState): IState => {
  return { user: new AuthUser(state.user) };
}

export const mapDispatchToProps = (dispatch: Function) => ({})

const GroupAccess = ({ children, authentication, user, alt = null }: Props) => (
  <Fragment>
    { user.hasPermission(authentication) ? children : alt }
  </Fragment>
)

export default connect(mapStateToProps, mapDispatchToProps)(GroupAccess)
*/

export interface IState {
  children: JSX.Element;
  alt?: JSX.Element;
  authentication: IGroup | Permission;
}

const Authentcate = ({ children, authentication, alt = null }: IState) => (
  <UserContext.Consumer>
    { ({ user, loggedIn }) => {
      console.log(loggedIn)
      return user.hasPermission(authentication) ? children : alt }
    }
  </UserContext.Consumer>
)

export default Authentcate;

