import * as Sentry from '@sentry/browser';
import { __SSR__ } from 'common/constants/environment';
import { OWF_SENTRY_DSN } from 'common/constants/sentry';
import Prefetched from 'common/providers/Prefetched';
import PrefetchState from 'common/utils/PrefetchState';
import ContextWrapper from 'core/providers/ContextWrapper';
import React, { FC } from 'react';
import { BrowserRouter, StaticRouter } from 'react-router-dom';
import { registerServiceWorker } from 'serviceworker/browser';

import App from '../App';

if (process.browser) {
  registerServiceWorker();
}

Sentry.init({
  dsn: OWF_SENTRY_DSN,
});

const prefetcher = new PrefetchState();
prefetcher.serialize();

export const MainEntry = () => {
  const Router: FC = ({ children }) =>
    process.browser ? <BrowserRouter>{children}</BrowserRouter> : <StaticRouter>{children}</StaticRouter>;

  return (
    <Router>
      <Prefetched prefetcher={prefetcher}>
        <ContextWrapper>
          <App />
        </ContextWrapper>
      </Prefetched>
    </Router>
  );
};

export default MainEntry;
