import '@babel/polyfill';

import * as React from 'react';
import * as ReactDOM from 'react-dom';

import App from 'App';

const render = (Component: any) => {
  ReactDOM.render(
    <Component />,
    document.getElementById("root")
  );
};

render(App);

if (module.hot) {
  module.hot.accept('./App', () => {
    render(App);
  });
};
