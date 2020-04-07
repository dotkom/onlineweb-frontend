import * as Sentry from '@sentry/browser';
import { Settings as LuxonSettings } from 'luxon';
import DefaultApp, { AppProps } from 'next/app';
import React from 'react';

import 'react-day-picker/lib/style.css';

import AuthProvider from 'authentication/providers/UserProvider';
import { OWF_SENTRY_DSN } from 'common/constants/sentry';
import Core from 'core';
import ContextWrapper from 'core/providers/ContextWrapper';
import UserProfileProvider from 'profile/providers/UserProfile';
import { registerServiceWorker } from 'serviceworker/browser';

/** Luxon locale setting has to be the same as in the front-end */
LuxonSettings.defaultLocale = 'nb';

if (process.browser) {
  registerServiceWorker();
}

Sentry.init({
  dsn: OWF_SENTRY_DSN,
});

type Props = AppProps;

const CustomApp = (appProps: Props): JSX.Element => {
  const { Component, pageProps } = appProps;
  return (
    <ContextWrapper>
      <AuthProvider>
        <UserProfileProvider>
          <Core>
            <Component {...pageProps} />
          </Core>
        </UserProfileProvider>
      </AuthProvider>
    </ContextWrapper>
  );
};

CustomApp.getInitialProps = DefaultApp.getInitialProps;

export default CustomApp;
