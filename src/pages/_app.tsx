import 'core/polyfills';

import * as Sentry from '@sentry/browser';
import { Settings as LuxonSettings } from 'luxon';
import withRedux, { ReduxWrapperAppProps } from 'next-redux-wrapper';
import DefaultApp, { AppProps } from 'next/app';
import React from 'react';
import { Provider } from 'react-redux';

import 'react-day-picker/lib/style.css';

import { __CLIENT__, __PROD__ } from 'common/constants/environment';
import { OWF_SENTRY_DSN } from 'common/constants/sentry';
import Core from 'core';
import ContextWrapper from 'core/providers/ContextWrapper';
import { initStore, State } from 'core/redux/Store';
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

type Props = AppProps & ReduxWrapperAppProps<State>;

const CustomApp = (appProps: Props): JSX.Element => {
  const { Component, pageProps, store } = appProps;
  return (
    <>
      <GlobalStyle />
      <Provider store={store}>
        <ContextWrapper>
          <UserProfileProvider>
            <Core>
              <Component {...pageProps} />
            </Core>
          </UserProfileProvider>
        </ContextWrapper>
      </Provider>
    </>
  );
};

CustomApp.getInitialProps = DefaultApp.getInitialProps;

export default withRedux(initStore)(CustomApp);
