import 'core/polyfills';

// import * as Sentry from '@sentry/node';
import { HOST, PORT } from 'common/constants/backend';
// import { OWF_SENTRY_DSN } from 'common/constants/sentry';
import Prefetched from 'common/providers/Prefetched';
import PrefetchState from 'common/utils/PrefetchState';
import cookieParser from 'cookie-parser';
import ContextWrapper from 'core/providers/ContextWrapper';
import { Cookies } from 'core/providers/Cookies';
import express from 'express';
import fs from 'fs';
import path from 'path';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import serialize from 'serialize-javascript';

import { App } from '../App';
import { withAnalytics } from './analytics';

/**
 * Server side rendering uses a very simple single route express server to handle
 * requests, middlwares and other server related things. Rendering is still done by React.
 */
const app = express();

/** Initialize Sentry error forwarding for the back-end */
// Disable Sentry, causes Typescript error because its types are not correct.
// Sentry.init({ dsn: OWF_SENTRY_DSN });
// app.use(Sentry.Handlers.requestHandler());
// app.use(Sentry.Handlers.errorHandler());

/**
 * Cookies are used to store anonymous user data that has to be used by both
 * the front-end and the back-end. Things like the eventView setting is stored here
 * to give the user a default choice. For the back-end to render the correct view
 * the back-end need that data as well as the front-end.
 */
app.use(cookieParser());

app.use('/public', express.static('./dist'));
app.use('/static', express.static('./static'));

/** Initialize analytics endpoints */
withAnalytics(app);

interface IWebpackAssets {
  [key: string]: {
    [lang: string]: string;
  };
}

const getAssets = (): IWebpackAssets => {
  const assetsString = fs.readFileSync('./dist/webpack-assets.json').toString();
  return JSON.parse(assetsString);
};

const getBundles = (): [string[], string[]] => {
  const assets = getAssets();
  const js = [assets.app.js, assets.vendor.js].map(getScript);
  const css = [assets.app.css, assets.profile.css].map(getStyle);
  return [js, css];
};

const getStyle = (style: string) => `<link rel="stylesheet" type="text/css" href="${style}">`;
const getScript = (script: string) => `<script src="${script}"></script>`;

app.get('/serviceworker.js', (_, res) => {
  const assets = getAssets();
  const swPath = `.${assets.serviceworker.js}`.replace('public', 'dist');
  const swAbsPath = path.resolve(swPath);
  res.sendFile(swAbsPath);
});

/**
 * @summary Main entrypoint for express application backend.
 * @description The back-end application serves a only a single route in Express.
 * All routing on the back-end is handled by the React StaticRouter. When the front-end
 * 'rehydrates' the rendered HTML, it will take over for the StaticRouter with a Browser based Router.
 * Note that the server side will _ONLY_ render the initial route, the rest is done in the front-end.
 */
app.get('*', async (req, res) => {
  const prefetcher = new PrefetchState();

  /** Render first time to register all fetches that are needed for current route */
  const initPrefetch = initJSX(req.path, prefetcher, req.cookies);
  renderToString(initPrefetch);

  await prefetcher.fetchAll();

  /** Initialize and do the actual render which will be sent to the user */
  const jsx = initJSX(req.path, prefetcher, req.cookies);
  const reactDom = renderToString(jsx);
  const HTML = wrapHtml(reactDom, prefetcher);

  /** Send the finished response to the client */
  res.send(HTML);
});

/**
 * @summary This is where the magic happens.
 * @description The node server renders all the JSX just as the browser would do it.
 * Worth to remember that 'componentDidMount' will _NOT_ be called in the back-end.
 * Other than that everything is rendered just like in the browser. The StaticRouter uses the
 * requested url to render the corrent corresponding view to the user.
 */
const initJSX = (location: string, prefetcher: PrefetchState, cookies: { [name: string]: string }): JSX.Element => (
  <StaticRouter location={location} context={{}}>
    <Cookies cookies={cookies}>
      <Prefetched prefetcher={prefetcher}>
        <ContextWrapper>
          <App />
        </ContextWrapper>
      </Prefetched>
    </Cookies>
  </StaticRouter>
);

/**
 * @summary Wrap the React DOM in standard HTML.
 * @description Wrapping React dom in standard HTML. Adding sources for bundeled Javascript and CSS.
 * Also sets the initial state for the providers that need an initial state for fast render.
 * This is rendered as a string in the DOM and serialized by the front-end when it loads.
 * @param {string} dom A string containing a pre-rendered React DOM.
 */
const wrapHtml = (dom: string, prefetcher: PrefetchState) => {
  const [scripts, stylesheets] = getBundles();
  return `
    <!DOCTYPE html>
    <html lang="nb">
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta http-equiv="Cache-control" content="no-cache, no-store, must-revalidate">
        <meta http-equiv="Pragma" content="no-cache">
        <title>Linjeforeningen Online</title>
        <link rel="icon" type="image/png" href="/static/icon-256.png" />
        <link rel="manifest" href="/static/owf.webmanifest" />
        ${stylesheets.join('\n')}
      </head>
      <body>
        <div id="root">${dom}</div>
        <script>
          window.__PREFETCHED_STATE__ = ${JSON.stringify(serialize(prefetcher.getData()))}
        </script>
        ${scripts.join('\n')}
      </body>
    </html>
  `;
};

/** Initialize the Express server to listen for requests */
app.listen(Number(PORT), HOST || '', () => {
  /* tslint:disable-next-line no-console */
  console.log(`OWF Backend server running on ${HOST}:${PORT}`);
});
