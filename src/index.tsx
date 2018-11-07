import * as Sentry from '@sentry/browser';
import { OWF_SENTRY_DSN } from 'common/constants/sentry';
import { Settings } from 'luxon';
import React, { Component, ErrorInfo } from 'react';
import * as ReactDOM from 'react-dom';

Settings.defaultLocale = 'nb';

import App from 'App';

Sentry.init({
  dsn: OWF_SENTRY_DSN,
});

interface IErrorInfo extends ErrorInfo {
  [key: string]: string;
}

class Root extends Component {
  public componentDidCatch(error: Error, errorInfo: IErrorInfo) {
    Sentry.withScope((scope) => {
      Object.keys(errorInfo).forEach((key) => {
        scope.setExtra(key, errorInfo[key]);
      });

      Sentry.captureException(error);
    });
  }

  public render() {
    return <App />;
  }
}

const render = (RootComponent: any) => {
  ReactDOM.render(<RootComponent />, document.getElementById('root'));
};

render(App);

if (module.hot) {
  module.hot.accept('./App', () => {
    render(App);
  });
}
