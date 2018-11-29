import { Component } from 'react';
import { IUserContext, UserContext } from '../providers/UserProvider';

export interface IProps {
  permissions?: string[];
}

/**
 * @summary Require authentication and authorization to render children.
 * @param {?string[]} permissions If specified, requires a set of permissions to render as well.
 */
class RequireAuth extends Component<IProps> {
  public static contextType = UserContext;

  public render() {
    const { user }: IUserContext = this.context;
    const { children } = this.props;
    return user ? children : null;
  }
}

export default RequireAuth;
