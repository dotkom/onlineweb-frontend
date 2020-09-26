import 'core/polyfills';

import * as Sentry from '@sentry/browser';
import { Settings as LuxonSettings } from 'luxon';
import { AppProps } from 'next/app';
import React from 'react';

import 'react-day-picker/lib/style.css';

import AuthProvider from 'authentication/providers/UserProvider';
import { __CLIENT__, __PROD__ } from 'common/constants/environment';
import { OWF_SENTRY_DSN } from 'common/constants/sentry';
import Core from 'core';
import ContextWrapper from 'core/providers/ContextWrapper';
import { wrapper } from 'core/redux/Store';
import UserProfileProvider from 'profile/providers/UserProfile';
import { registerServiceWorker } from 'serviceworker/browser';

import { GlobalStyle } from '@dotkomonline/design-system';

/** Luxon locale setting has to be the same as in the front-end */
LuxonSettings.defaultLocale = 'nb';

if (__CLIENT__ && __PROD__) {
  registerServiceWorker();
}

Sentry.init({
  dsn: OWF_SENTRY_DSN,
});

const CustomApp = (appProps: AppProps): JSX.Element => {
  const { Component, pageProps } = appProps;
  return (
    <>
      <GlobalStyle />
      <ContextWrapper>
        <AuthProvider>
          <UserProfileProvider>
            <Core>
              <Component {...pageProps} />
            </Core>
          </UserProfileProvider>
        </AuthProvider>
      </ContextWrapper>
    </>
  );
};

export default wrapper.withRedux(CustomApp);
