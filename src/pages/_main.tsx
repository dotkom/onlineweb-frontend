import * as Sentry from '@sentry/browser';
import { useRouter } from 'next/router';
import React, { FC } from 'react';
import { BrowserRouter, StaticRouter } from 'react-router-dom';

import { __SSR__ } from 'common/constants/environment';
import { OWF_SENTRY_DSN } from 'common/constants/sentry';
import Prefetched from 'common/providers/Prefetched';
import PrefetchState from 'common/utils/PrefetchState';
import ContextWrapper from 'core/providers/ContextWrapper';
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
  const router = useRouter();
  const { routes } = router.query as { routes: string[] | undefined };
  const path = routes ? `/${routes.join('/')}` : '/';
  const Router: FC = ({ children }) =>
    process.browser ? (
      <BrowserRouter>{children}</BrowserRouter>
    ) : (
      <StaticRouter location={path}>{children}</StaticRouter>
    );

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
