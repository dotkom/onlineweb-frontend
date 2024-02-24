import { HOST } from 'common/constants/endpoints';
import { UserManagerSettings } from 'oidc-client-ts';

const settings: UserManagerSettings = {
  authority: process.env.AUTH0_ISSUER || '',
  client_id: process.env.AUTH0_CLIENT_ID || '',
  redirect_uri: process.env.OW4_SSO_CALLBACK || '',
  post_logout_redirect_uri: HOST,
  scope: 'openid profile email',
  automaticSilentRenew: true,
  filterProtocolClaims: true,
  loadUserInfo: true,
  revokeTokensOnSignout: true,
  revokeTokenTypes: ['refresh_token'],
};

export default settings;
