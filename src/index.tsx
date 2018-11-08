import * as Sentry from '@sentry/browser';
import { GA_KEY } from 'common/constants/google';
import { OWF_SENTRY_DSN } from 'common/constants/sentry';
import Settings from 'core/providers/Settings';
import { createBrowserHistory } from 'history';
import cookies from 'js-cookie';
import { Settings as LuxonSettings } from 'luxon';
import React from 'react';
import * as ReactDOM from 'react-dom';
import ReactGA from 'react-ga';
import { Router } from 'react-router-dom';

LuxonSettings.defaultLocale = 'nb';

import App from './App';
import { getEventView } from 'events/components/EventsContainer';

Sentry.init({
  dsn: OWF_SENTRY_DSN,
});

ReactGA.initialize(GA_KEY);
ReactGA.pageview(window.location.pathname);
const history = createBrowserHistory();
history.listen((location) => ReactGA.pageview(location.pathname));

const render = (RootComponent: any) => {
  const eventView = getEventView(cookies.get('eventView'));
  console.log(eventView);
  ReactDOM.hydrate(
    <Router history={history}>
      <Settings eventView={eventView}>
        <RootComponent />
      </Settings>
    </Router>
  , document.getElementById('root'));
};

render(App);

if (module.hot) {
  module.hot.accept('./App', () => {
    render(App);
  });
}
