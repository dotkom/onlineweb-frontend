import * as Sentry from '@sentry/browser';
import { __SSR__ } from 'common/constants/environment';
import { GA_KEY } from 'common/constants/google';
import { OWF_SENTRY_DSN } from 'common/constants/sentry';
import { getStateCache } from 'common/utils/stateCacheResolver';
import ContextWrapper from 'core/providers/ContextWrapper';
import Settings from 'core/providers/Settings';
import { getEventView } from 'events/components/EventsContainer';
import { createBrowserHistory } from 'history';
import cookies from 'js-cookie';
import { Settings as LuxonSettings } from 'luxon';
import React from 'react';
import * as ReactDOM from 'react-dom';
import ReactGA from 'react-ga';
import { Router } from 'react-router-dom';
import { EMPTY_STATE_CACHE } from 'server/stateCache';

LuxonSettings.defaultLocale = 'nb';

import App from './App';

Sentry.init({
  dsn: OWF_SENTRY_DSN,
});

ReactGA.initialize(GA_KEY);
ReactGA.pageview(window.location.pathname);
const history = createBrowserHistory();
history.listen((location) => ReactGA.pageview(location.pathname));

const render = (RootComponent: any) => {
  const cache = getStateCache() || EMPTY_STATE_CACHE;
  console.log(cache)
  const eventView = getEventView(cookies.get('eventView'));
  /** Define renderer to use, hydrate if SSR back-end is enabled, render if no back-end */
  const reactRender = __SSR__ ? ReactDOM.render : ReactDOM.hydrate;
  reactRender(
    <Router history={history}>
      <Settings eventView={eventView}>
        <ContextWrapper {...cache}>
          <RootComponent />
        </ContextWrapper>
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
