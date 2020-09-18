import React, { useEffect, FC, useLayoutEffect } from 'react';

import { USER_MANAGER } from 'authentication/api';
import { __CLIENT__ } from 'common/constants/environment';
import { useDispatch } from 'core/redux/hooks';
import { authenticationActions } from 'authentication/slices/authentication';
import { IAuthUser } from 'authentication/models/User';

const useIsomorphicLayoutEffect = __CLIENT__ ? useLayoutEffect : useEffect;

type JSON<T> = string & {__JSON__: T};
declare const JSON: {
  parse: <T>(str: JSON<T>) => T;
  stringify: <T>(obj: T) => JSON<T>;
};

export const SilentRenewComponent: FC = () => {
  const dispatch = useDispatch();
  const loadCurrentUser = async () => {
    if (USER_MANAGER) {
      try {
        const user = await USER_MANAGER.getUser();
        if (user) dispatch(authenticationActions.userSignIn(JSON.stringify(user as IAuthUser)));
        else USER_MANAGER.signinSilent()
      }
      catch (err) {
        console.error(err);
      }
    }
  }

  useIsomorphicLayoutEffect(() => {
    loadCurrentUser();
  }, [loadCurrentUser]);

  return <></>;
};

export const SilentRenew = SilentRenewComponent;
