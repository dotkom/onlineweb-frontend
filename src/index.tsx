import 'core/polyfills';

import * as Sentry from '@sentry/browser';
import { __SSR__ } from 'common/constants/environment';
import { GA_KEY } from 'common/constants/google';
import { OWF_SENTRY_DSN } from 'common/constants/sentry';
import Prefetched from 'common/providers/Prefetched';
import PrefetchState from 'common/utils/PrefetchState';
import ContextWrapper from 'core/providers/ContextWrapper';
import { Cookies } from 'core/providers/Cookies';
import { createBrowserHistory } from 'history';
import cookies from 'js-cookie';
import React from 'react';
import * as ReactDOM from 'react-dom';
import ReactGA from 'react-ga';
import { Router } from 'react-router-dom';
import { registerServiceWorker } from 'serviceworker/browser';

import App from './App';

registerServiceWorker();

Sentry.init({
  dsn: OWF_SENTRY_DSN,
});

ReactGA.initialize(GA_KEY, { gaAddress: '/static/analytics.js' });
ReactGA.pageview(window.location.pathname);
const history = createBrowserHistory();
history.listen((location) => ReactGA.pageview(location.pathname));

const prefetcher = new PrefetchState();
prefetcher.serialize();

const render = (RootComponent: any) => {
  const initialCookies = cookies.getJSON();
  /** Define renderer to use, hydrate if SSR back-end is enabled, render if no back-end */
  const reactRender = __SSR__ ? ReactDOM.hydrate : ReactDOM.render;
  reactRender(
    <Router history={history}>
      <Cookies cookies={initialCookies}>
        <Prefetched prefetcher={prefetcher}>
          <ContextWrapper>
            <RootComponent />
          </ContextWrapper>
        </Prefetched>
      </Cookies>
    </Router>,
    document.getElementById('root')
  );
};

render(App);

if (module.hot) {
  module.hot.accept('./App', () => {
    render(App);
  });
}
