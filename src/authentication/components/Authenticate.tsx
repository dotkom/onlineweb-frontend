import { IGroup } from 'core/models/Group';
import { Permission } from 'core/models/Permission';
import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { AuthUser } from '../models/User';
import { IState } from '../reducers';

export interface IProps extends IState {
  user: AuthUser;
  children: JSX.Element;
  alt?: JSX.Element;
  authentication: IGroup | Permission;
}

export const mapStateToProps = (state: IState): IState => {
  return { user: new AuthUser(state.user) };
};

// tslint:disable-next-line
export const mapDispatchToProps = (dispatch: Function) => ({
  /** Not going to change the state for user */
});

const GroupAccess = ({ children, authentication, user, alt = null }: Props) => (
  <Fragment>{user.hasPermission(authentication) ? children : alt}</Fragment>
);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GroupAccess);
