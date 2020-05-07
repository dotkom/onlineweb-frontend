import React, { useEffect, FC, useCallback, useLayoutEffect } from 'react';

import { USER_MANAGER } from 'authentication/api';
import { __CLIENT__ } from 'common/constants/environment';
import { useDispatch } from 'core/redux/hooks';
import { authenticationActions } from 'authentication/slices/authentication';
import { IAuthUser } from 'authentication/models/User';

const useIsomorphicLayoutEffect = __CLIENT__ ? useLayoutEffect : useEffect;

export const SilentRenewComponent: FC = () => {
  const dispatch = useDispatch();
  const loadCurrentUser = useCallback(async () => {
    if (USER_MANAGER) {
      try {
        const user = await USER_MANAGER.getUser();
        dispatch(authenticationActions.userSignIn(user as IAuthUser));
        USER_MANAGER.signinSilent().catch((err) => {
          console.error(err);
        });
      } catch (err) {
        console.error(err);
      }
    }
  }, [dispatch]);

  useIsomorphicLayoutEffect(() => {
    loadCurrentUser();
  }, [loadCurrentUser]);

  return <></>;
};

export const SilentRenew = React.memo(SilentRenewComponent);
