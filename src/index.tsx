import * as Sentry from '@sentry/browser';
import { GA_KEY } from 'common/constants/google';
import { OWF_SENTRY_DSN } from 'common/constants/sentry';
import { Settings } from 'luxon';
import React from 'react';
import * as ReactDOM from 'react-dom';
import ReactGA from 'react-ga';

Settings.defaultLocale = 'nb';

import App from './App';
import { createBrowserHistory } from 'history';
import { Router } from 'react-router-dom';

Sentry.init({
  dsn: OWF_SENTRY_DSN,
});

ReactGA.initialize(GA_KEY);
ReactGA.pageview(window.location.pathname);

const render = (RootComponent: any) => {
  ReactDOM.hydrate(<RootComponent />, document.getElementById('root'));
};

render(Root);

if (module.hot) {
  module.hot.accept('./App', () => {
    render(App);
  });
}
