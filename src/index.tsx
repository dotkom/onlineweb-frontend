import * as Sentry from '@sentry/browser';
import { OWF_SENTRY_DSN } from 'common/constants/sentry';
import { Settings } from 'luxon';
import React from 'react';
import * as ReactDOM from 'react-dom';

Settings.defaultLocale = 'nb';

import App from 'App';

Sentry.init({
  dsn: OWF_SENTRY_DSN,
});

const render = (RootComponent: any) => {
  ReactDOM.render(<RootComponent />, document.getElementById('root'));
};

render(App);

if (module.hot) {
  module.hot.accept('./App', () => {
    render(App);
  });
}
