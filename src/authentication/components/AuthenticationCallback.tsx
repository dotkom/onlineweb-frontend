import { useRouter } from 'next/router';
import React, { FC, useEffect } from 'react';

import { getFrontPageUrl } from 'core/appUrls';
import { USER_MANAGER } from 'authentication/api';

const AuthenticationCallbackComponent: FC = ({ children }) => {
  const router = useRouter();
  const catchCallback = async () => {
    if (USER_MANAGER) {
      const frontPageUrl = getFrontPageUrl().href;
      try {
        const user = await USER_MANAGER.signinCallback();
        router.push(user.state || frontPageUrl);
      } catch (err) {
        router.push(frontPageUrl);
      }
    }
  };

  useEffect(() => {
    catchCallback();
  }, []);

  useEffect(() => {
    if (USER_MANAGER) {
      USER_MANAGER.signinSilentCallback();
    }
  }, []);

  return <>{children}</>;
};

export const AuthenticationCallback = React.memo(AuthenticationCallbackComponent);
