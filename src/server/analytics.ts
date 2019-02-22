import { Application, Request as ExpressRequest } from 'express';
import proxy from 'express-http-proxy';
import path from 'path';

/**
 * Inspiration taken from:
 * https://medium.freecodecamp.org/save-your-analytics-from-content-blockers-7ee08c6ec7ee
 */

export const ANALYTICS_URL = '/analytics-script.js';
export const ANALYTICS_ROUTE = '/analytics';
export const GOOGLE_ANALYTICS_URL = 'www.google-analytics.com';

const getIp = (req: ExpressRequest) => {
  const { connection, headers } = req;
  const forwardHeaders = headers['x-forwarded-for'];
  const forwardHeader = Array.isArray(forwardHeaders) ? forwardHeaders[0] : forwardHeaders;
  const address = ':' + (connection && connection.remoteAddress) || forwardHeader || '';
  return (address.match(/:([^:]+)$/) || [])[1] || '127.0.0.1';
};

const pathResolver = (req: ExpressRequest) => {
  const queryStart = req.url.indexOf('?') === -1 ? '?' : '&';
  const uip = encodeURIComponent(getIp(req));
  const str = `${req.url}${queryStart}uip=${uip}`;
  return str;
};

export const withAnalytics = (app: Application) => {
  app.use(ANALYTICS_URL, (_, res) => {
    const swAbsPath = path.resolve('./static/analytics.js');
    res.sendFile(swAbsPath);
    res.sendFile('./public/analytics.js');
  });
  app.use(
    ANALYTICS_ROUTE,
    proxy(GOOGLE_ANALYTICS_URL, {
      proxyReqPathResolver: (req) => pathResolver(req),
    })
  );
};
