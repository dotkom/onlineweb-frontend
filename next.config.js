/* eslint-disable @typescript-eslint/no-var-requires */
const withLess = require('@zeit/next-less');
const withCss = require('@zeit/next-css');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

const redirects = async () => {
  return [
    {
      source: '/events/:eventId/:slug',
      destination: '/events/:eventId',
      permanent: true,
    },
    {
      source: '/article/:articleId/:slug',
      destination: '/articles/:articleId',
      permanent: true,
    },
    {
      source: '/careeropportunity',
      destination: '/career',
      permanent: true,
    },
    {
      source: '/careeropportunity/:careerId',
      destination: '/career/:careerId',
      permanent: true,
    },
    {
      source:
        '/:prefix(wiki|dashboard|sso|feedback|auth|api/v1|admin|openid|redwine|resourcecenter|webshop|gallery|jsreverse|shop|dataporten|profile/api_plain_user_search|splash|contact)/:path*',
      destination: 'https://old.online.ntnu.no/:prefix/:path*',
      permanent: true,
    },
  ];
};

module.exports = withBundleAnalyzer(
  withCss(
    withLess({
      cssModules: true,
      webpack: (config, options) => {
        if (config.resolve.plugins) {
          config.resolve.plugins.push(new TsconfigPathsPlugin());
        } else {
          config.resolve.plugins = [new TsconfigPathsPlugin()];
        }
        config.module.rules.push({
          test: /\.(eot|woff|woff2|ttf|svg|png|jpg|jpeg|gif)$/,
          use: {
            loader: 'url-loader',
            options: {
              limit: 5000,
              name: '[name].[ext]',
            },
          },
        });
        return config;
      },
      env: {
        OW4_ADDRESS: process.env.OW4_ADDRESS || 'https://old.online.ntnu.no',
        OW4_SSO_CLIENT_ID: process.env.OW4_SSO_CLIENT_ID || '',
        OW4_SSO_CALLBACK: process.env.OW4_SSO_CALLBACK || 'http://localhost:8080/authentication/callback',
        OWF_SENTRY_DSN: process.env.OWF_SENTRY_DSN || '',
        OWF_GOOGLE_ANALYTICS_KEY: process.env.OWF_GOOGLE_ANALYTICS_KEY || '',
        OWF_VAPID_SERVER_KEY: process.env.OWF_VAPID_SERVER_KEY || '',
        STRIPE_PUBLIC_KEY_ARRKOM: process.env.STRIPE_PUBLIC_KEY_ARRKOM || null,
        STRIPE_PUBLIC_KEY_FAGKOM: process.env.STRIPE_PUBLIC_KEY_FAGKOM || null,
        STRIPE_PUBLIC_KEY_PROKOM: process.env.STRIPE_PUBLIC_KEY_PROKOM || null,
        STRIPE_PUBLIC_KEY_TRIKOM: process.env.STRIPE_PUBLIC_KEY_TRIKOM || null,
        RECAPTCHA_PUBLIC_KEY: process.env.RECAPTCHA_PUBLIC_KEY || '',
      },
      redirects,
      images: {
        deviceSizes: [320, 420, 768, 1024, 1200],
        iconSizes: [],
        domains: [
          'online.ntnu.no',
          'dev.online.ntnu.no',
          'old.online.ntnu.no',
          'api.online.ntnu.no',
          'cdn.sanity.io',
          'onlineweb4-prod.s3.eu-north-1.amazonaws.com',
        ],
        path: '/_next/image',
        loader: 'default',
      },
    })
  )
);
