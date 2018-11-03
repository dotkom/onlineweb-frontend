import React, { Component, ErrorInfo } from 'react';
import * as ReactDOM from 'react-dom';
import * as Sentry from '@sentry/browser';
import { Settings } from 'luxon';

Settings.defaultLocale = 'no';

import App from 'App';

Sentry.init({
  dsn: process.env.OWF_SENTRY_DSN,
});

interface IErrorInfo extends ErrorInfo {
  [key: string]: string;
};

class Root extends Component {
  componentDidCatch(error: Error, errorInfo: IErrorInfo) {
    Sentry.withScope(scope => {
      Object.keys(errorInfo).forEach(key => {
        scope.setExtra(key, errorInfo[key]);
      });
      
      Sentry.captureException(error);
    });
  }

  render() {
    return <App />;
  }
}

const render = (Component: any) => {
  ReactDOM.render(<Component />, document.getElementById('root'));
};

render(App);

if (module.hot) {
  module.hot.accept('./App', () => {
    render(App);
  });
}
