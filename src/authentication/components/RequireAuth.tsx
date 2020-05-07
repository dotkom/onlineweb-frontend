import React, { FC } from 'react';
import { useSelector } from 'core/redux/hooks';
import { selectIsLoggedIn } from 'authentication/selectors/authentication';

interface IProps {
  permissions?: string[];
}

/**
 * @summary Require authentication and authorization to render children.
 * @param {?string[]} permissions If specified, requires a set of permissions to render as well.
 */
const RequireAuth: FC<IProps> = ({ children }) => {
  const isLoggedIn = useSelector(selectIsLoggedIn());
  return isLoggedIn ? <>{children}</> : null;
};

export default RequireAuth;
