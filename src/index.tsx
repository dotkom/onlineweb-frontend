import * as Sentry from '@sentry/browser';
import { __SSR__ } from 'common/constants/environment';
import { GA_KEY } from 'common/constants/google';
import { OWF_SENTRY_DSN } from 'common/constants/sentry';
import Prefetched from 'common/providers/Prefetched';
import PrefetchState from 'common/utils/PrefetchState';
import ContextWrapper from 'core/providers/ContextWrapper';
import Settings from 'core/providers/Settings';
import { getEventView } from 'events/components/EventsContainer';
import { createBrowserHistory } from 'history';
import cookies from 'js-cookie';
import React from 'react';
import * as ReactDOM from 'react-dom';
import ReactGA from 'react-ga';
import { Router } from 'react-router-dom';

import App from './App';

Sentry.init({
  dsn: OWF_SENTRY_DSN,
});

ReactGA.initialize(GA_KEY);
ReactGA.pageview(window.location.pathname);
const history = createBrowserHistory();
history.listen((location) => ReactGA.pageview(location.pathname));

const prefetcher = new PrefetchState();
prefetcher.serialize();

const render = (RootComponent: any) => {
  const eventView = getEventView(cookies.get('eventView'));
  /** Define renderer to use, hydrate if SSR back-end is enabled, render if no back-end */
  const reactRender = __SSR__ ? ReactDOM.hydrate : ReactDOM.render;
  reactRender(
    <Router history={history}>
      <Settings eventView={eventView}>
        <Prefetched prefetcher={prefetcher}>
          <ContextWrapper>
            <RootComponent />
          </ContextWrapper>
        </Prefetched>
      </Settings>
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
