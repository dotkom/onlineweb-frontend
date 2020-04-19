const withLess = require('@zeit/next-less');
const withCss = require('@zeit/next-css');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

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
        OW4_ADDRESS: process.env.OW4_ADDRESS || 'https://online.ntnu.no',
        OW4_SSO_CLIENT_ID: process.env.OW4_SSO_CLIENT_ID || '',
        OW4_SSO_CALLBACK: process.env.OW4_SSO_CALLBACK || 'http://localhost:3000/auth/callback',
        OWF_SENTRY_DSN: process.env.OWF_SENTRY_DSN || '',
        OWF_GOOGLE_ANALYTICS_KEY: process.env.OWF_GOOGLE_ANALYTICS_KEY || '',
        OWF_VAPID_PUBLIC_KEY: process.env.OWF_VAPID_PUBLIC_KEY || '',
        OWF_WEBPUSH_SERVER_URL: process.env.OWF_WEBPUSH_SERVER_URL || '',
        STRIPE_PUBLIC_KEY_ARRKOM: process.env.STRIPE_PUBLIC_KEY_ARRKOM || null,
        STRIPE_PUBLIC_KEY_FAGKOM: process.env.STRIPE_PUBLIC_KEY_FAGKOM || null,
        STRIPE_PUBLIC_KEY_PROKOM: process.env.STRIPE_PUBLIC_KEY_PROKOM || null,
        STRIPE_PUBLIC_KEY_TRIKOM: process.env.STRIPE_PUBLIC_KEY_TRIKOM || null,
        RECAPTCHA_PUBLIC_KEY: process.env.RECAPTCHA_PUBLIC_KEY || '',
      },
    })
  )
);
