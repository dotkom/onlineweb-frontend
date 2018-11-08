import * as Sentry from '@sentry/node';
import { HOST, PORT } from 'common/constants/backend';
import { OWF_SENTRY_DSN } from 'common/constants/sentry';
import cookieParser from 'cookie-parser';
import Settings from 'core/providers/Settings';
import { getEventView } from 'events/components/EventsContainer';
import express from 'express';
import path from 'path';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import serialize from 'serialize-javascript';
import { initStateCache } from './stateCache';

import { App } from '../App';

const app = express();

initStateCache()
setInterval(initStateCache, 5000 * 60);

Sentry.init({ dsn: OWF_SENTRY_DSN });
app.use(Sentry.Handlers.requestHandler());
app.use(Sentry.Handlers.errorHandler());

app.use(cookieParser())
app.use('/public', express.static(path.resolve(__dirname, '../dist')));
app.use('/public', express.static('./dist'));

app.get('*', (req, res) => {
  const eventView = getEventView(req.cookies.eventView);
  console.log(eventView);
  const jsx = (
    <StaticRouter location={req.path} context={{}}>
      <Settings eventView={eventView}>
        <App />
      </Settings>
    </StaticRouter>
  );
  const reactDom = renderToString(jsx);
  const HTML = wrapHtml(reactDom);

  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.end(HTML);
});

const wrapHtml = (dom: string) => `
  <!DOCTYPE html>
  <html lang="nb">
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <title>Linjeforeningen Online</title>
      <link rel="stylesheet" type="text/css" href="/public/main.css">
    </head>
    <body>
      <div id="root">${dom}</div>
      <script>
        window.__INITIAL_PROVIDER_STATE__ = ${JSON.stringify(serialize(global.STATE_CACHE))}
      </script>
      <script src="/public/app.js"></script>
      <script src="/public/vendor.js"></script>
      <script src="/public/profile.js"></script>
    </body>
  </html>
`;



app.listen(Number(PORT), HOST || '', () => {
  /* tslint:disable-next-line no-console */
  console.log(`OWF Backend server running on ${HOST}:${PORT}`);
});
