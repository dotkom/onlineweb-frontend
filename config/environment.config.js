const { EnvironmentPlugin } = require('webpack')

module.exports = {
  plugin: new webpack.EnvironmentPlugin({
    OW4_ADDRESS: 'https://online.ntnu.no',
    OW4_SSO_CLIENT_ID: '',
    OW4_SSO_CALLBACK: 'http://localhost:8080/auth/callback',
    OWF_SENTRY_DSN: '',
    OWF_GOOGLE_ANALYTICS_KEY: '',
    OWF_BACKEND_HOST: '0.0.0.0',
    OWF_BACKEND_PORT: '8080',
    NODE_ENV: 'development',
  }),
}
