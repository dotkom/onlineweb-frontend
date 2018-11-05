import express from 'express';
import path from 'path';
import * as Sentry from '@sentry/node';

import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';

import { App } from '../App';
import { OWF_SENTRY_DSN } from 'common/constants/sentry';
import { HOST, PORT } from 'common/constants/backend';

const app = express();

Sentry.init({ dsn: OWF_SENTRY_DSN });
app.use(Sentry.Handlers.requestHandler());
app.use(Sentry.Handlers.errorHandler());

app.use('/public', express.static(path.resolve(__dirname, '../dist')));
app.use('/public', express.static('./dist'));

app.get('*', (req, res) => {
  const jsx = (
    <StaticRouter location={req.path} context={{}}>
      <App />
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
      <script src="/public/app.js"></script>
    </body>
  </html>
`;

app.listen(Number(PORT), HOST || '', () => {
  console.log(`OWF Backend server running on ${HOST}:${PORT}`);
});
