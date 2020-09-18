import { DOMAIN } from 'common/constants/endpoints';
import { UserManagerSettings } from 'oidc-client';

const settings: UserManagerSettings = {
  authority: DOMAIN + '/openid',
  client_id: process.env.OW4_SSO_CLIENT_ID || '',
  redirect_uri: process.env.OW4_SSO_CALLBACK || '',
  post_logout_redirect_uri: DOMAIN + '/',
  response_type: 'id_token token',
  scope: 'openid profile onlineweb4',
  automaticSilentRenew: true,
  filterProtocolClaims: true,
  loadUserInfo: true,
  silent_redirect_uri: process.env.OW4_SSO_CALLBACK || '',
};

export default settings;
