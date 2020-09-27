import React, { useEffect, FC, useLayoutEffect } from 'react';

import { USER_MANAGER } from 'authentication/api';
import { __CLIENT__ } from 'common/constants/environment';
import { useDispatch } from 'core/redux/hooks';
import { authenticationActions } from 'authentication/slices/authentication';
import { IAuthUser } from 'authentication/models/User';

const useIsomorphicLayoutEffect = __CLIENT__ ? useLayoutEffect : useEffect;

type JSON<T> = string & { __JSON__: T };
declare const JSON: {
  parse: <T>(str: JSON<T>) => T;
  stringify: <T>(obj: T) => JSON<T>;
};

export const SilentRenewComponent: FC = () => {
  const dispatch = useDispatch();
  const loadCurrentUser = async () => {
    if (USER_MANAGER) {
      const user = await USER_MANAGER.getUser();
      if (user) dispatch(authenticationActions.userSignIn(JSON.stringify(user as IAuthUser)));
      else
        try {
          USER_MANAGER.signinSilent();
        } catch {
          /*
         User Manager throws "frame window timed out" or "Authorization Server requires End-User Interaction".
         If that is the case, the user will have to manually log in when the token expires.
         That is handled by the AuthenticationProvider and that is why the error is ignored here.
        */
        }
    }
  };

  useIsomorphicLayoutEffect(() => {
    loadCurrentUser();
  }, [loadCurrentUser]);

  return <></>;
};

export const SilentRenew = SilentRenewComponent;
