import { IGroup } from 'core/models/Group';
import { Permission } from 'core/models/Permission';
import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { AuthUser, IAuthUser } from '../models/User';
import { IState } from '../reducers';

export interface IProps extends IState {
  user: IAuthUser;
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

const GroupAccess: React.SFC<IProps> = ({ children, authentication, user, alt }) => (
  <Fragment>{(user as AuthUser).hasPermission(authentication) ? children : alt}</Fragment>
);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GroupAccess);
