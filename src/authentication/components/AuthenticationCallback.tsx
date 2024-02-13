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
        // eslint-disable-next-line
        // @ts-ignore
        const url: string = user?.state ?? frontPageUrl;
        router.push(url);
      } catch (err) {
        router.push(frontPageUrl);
      }
    }
  };

  useEffect(() => {
    catchCallback();
  }, []);

  return <>{children}</>;
};

export const AuthenticationCallback = AuthenticationCallbackComponent;
