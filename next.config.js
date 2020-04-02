const withLess = require('@zeit/next-less');
const withCss = require('@zeit/next-css');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

module.exports = withCss(
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
      OW4_ADDRESS: 'https://online.ntnu.no',
      OW4_SSO_CLIENT_ID: '',
      OW4_SSO_CALLBACK: 'http://localhost:3000/auth/callback',
      OWF_SENTRY_DSN: '',
      OWF_GOOGLE_ANALYTICS_KEY: '',
      OWF_VAPID_PUBLIC_KEY: '',
      OWF_WEBPUSH_SERVER_URL: '',
      STRIPE_PUBLIC_KEY_ARRKOM: null,
      STRIPE_PUBLIC_KEY_FAGKOM: null,
      STRIPE_PUBLIC_KEY_PROKOM: null,
      STRIPE_PUBLIC_KEY_TRIKOM: null,
    },
  })
);
