import React, { Fragment } from 'react';
import { IGroup } from 'core/models/Group';
import { connect } from 'react-redux';
import { IState } from '../reducers';
import { Permission } from 'core/models/Permission';
import { AuthUser } from '../models/User';

export interface IProps extends IState {
  user: AuthUser;
  children: JSX.Element;
  alt?: JSX.Element;
  authentication: IGroup | Permission;
}

export const mapStateToProps = (state: IState): IState => {
  return { user: new AuthUser(state.user) };
};

export const mapDispatchToProps = (dispatch: Function) => ({/** Not going to change the state for user */});

const GroupAccess = ({ children, authentication, user, alt = null }: Props) => (
  <Fragment>
    { user.hasPermission(authentication) ? children : alt }
  </Fragment>
);

export default connect(mapStateToProps, mapDispatchToProps)(GroupAccess);
