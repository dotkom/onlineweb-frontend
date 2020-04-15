import { useRouter } from 'next/router';
import { useCallback, useContext, useEffect } from 'react';

import { authCallback } from '../api';
import { UserContext } from '../providers/UserProvider';

export interface IProps {}

const AuthCallback = () => {
  const auth = useContext(UserContext);
  const router = useRouter();

  const catchUser = useCallback(async () => {
    const newUser = await authCallback();
    if (newUser) {
      auth.setUser(newUser);
      router.push(newUser.state);
    }
  }, [auth]);

  useEffect(() => {
    catchUser();
  }, [catchUser]);

  return null;
};

export default AuthCallback;
