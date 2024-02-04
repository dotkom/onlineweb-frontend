import { AUTH_DOMAIN, DOMAIN } from 'common/constants/endpoints';
import { UserManagerSettings } from 'oidc-client-ts';

const settings: UserManagerSettings = {
  authority: AUTH_DOMAIN,
  client_id: process.env.OW4_SSO_CLIENT_ID || '',
  redirect_uri: process.env.OW4_SSO_CALLBACK || '',
  post_logout_redirect_uri: DOMAIN + '/',
  scope: 'openid profile onlineweb4 email',
  automaticSilentRenew: true,
  filterProtocolClaims: true,
  loadUserInfo: true,
  extraQueryParams: {
    audience: 'https://online.ntnu.no',
  },
  revokeTokensOnSignout: true,
  revokeTokenTypes: ['refresh_token'],
};

export default settings;
