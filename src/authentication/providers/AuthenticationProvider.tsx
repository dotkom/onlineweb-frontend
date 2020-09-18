import React, { FC, useCallback, useEffect } from 'react';

import { useDispatch } from 'core/redux/hooks';
import { authenticationActions } from 'authentication/slices/authentication';
import { USER_MANAGER } from 'authentication/api';
import { User } from 'oidc-client';
import { IAuthUser } from 'authentication/models/User';

type JSON<T> = string & { __JSON__: T };
declare const JSON: {
  parse: <T>(str: JSON<T>) => T;
  stringify: <T>(obj: T) => JSON<T>;
};

// This component registers listeners for all authentication/user-related events which adds the events to the Redux store.
const AuthenticationProviderComponent: FC = ({ children }) => {
  const dispatch = useDispatch();

  // event callback when the user has been loaded (on silent renew or redirect)
  const onUserLoaded = useCallback(
    (user: User) => {
      dispatch(authenticationActions.userSignIn(JSON.stringify(user as IAuthUser)));
    },
    [dispatch]
  );

  // event callback when silent renew errored
  const onSilentRenewError = useCallback(() => {
    dispatch(authenticationActions.userSilentRenewError());
  }, [dispatch]);

  // event callback when the access token expired
  const onAccessTokenExpired = useCallback(() => {
    dispatch(authenticationActions.userExpired());
  }, [dispatch]);

  // event callback when the user is logged out
  const onUserUnloaded = useCallback(() => {
    dispatch(authenticationActions.userSessionTerminated());
  }, [dispatch]);

  // event callback when the user is expiring
  const onAccessTokenExpiring = useCallback(() => {
    dispatch(authenticationActions.userExpired());
  }, [dispatch]);

  // event callback when the user is signed out
  const onUserSignedOut = useCallback(() => {
    dispatch(authenticationActions.userSignOut());
  }, [dispatch]);

  const addEventListeners = useCallback(() => {
    if (USER_MANAGER) {
      USER_MANAGER.events.addUserLoaded(onUserLoaded);
      USER_MANAGER.events.addSilentRenewError(onSilentRenewError);
      USER_MANAGER.events.addAccessTokenExpired(onAccessTokenExpired);
      USER_MANAGER.events.addAccessTokenExpiring(onAccessTokenExpiring);
      USER_MANAGER.events.addUserUnloaded(onUserUnloaded);
      USER_MANAGER.events.addUserSignedOut(onUserSignedOut);
    }
  }, [onUserLoaded, onSilentRenewError, onAccessTokenExpired, onAccessTokenExpiring, onUserUnloaded, onUserSignedOut]);

  const removeEventListeners = useCallback(() => {
    if (USER_MANAGER) {
      USER_MANAGER.events.removeUserLoaded(onUserLoaded);
      USER_MANAGER.events.removeSilentRenewError(onSilentRenewError);
      USER_MANAGER.events.removeAccessTokenExpired(onAccessTokenExpired);
      USER_MANAGER.events.removeAccessTokenExpiring(onAccessTokenExpiring);
      USER_MANAGER.events.removeUserUnloaded(onUserUnloaded);
      USER_MANAGER.events.removeUserSignedOut(onUserSignedOut);
    }
  }, [onUserLoaded, onSilentRenewError, onAccessTokenExpired, onAccessTokenExpiring, onUserUnloaded, onUserSignedOut]);

  useEffect(() => {
    addEventListeners();
    return () => removeEventListeners();
  }, [addEventListeners]);

  return <>{children}</>;
};

export const AuthenticationProvider = React.memo(AuthenticationProviderComponent);
