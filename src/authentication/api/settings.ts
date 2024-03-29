import { UserManagerSettings } from 'oidc-client-ts';

const settings: UserManagerSettings = {
  authority: process.env.AUTH0_ISSUER || '',
  client_id: process.env.AUTH0_CLIENT_ID || '',
  redirect_uri: `${process.env.HOSTNAME}/authentication/callback`,
  post_logout_redirect_uri: `${process.env.HOSTNAME}`,
  scope: 'openid profile email offline_access',
  automaticSilentRenew: true,
  filterProtocolClaims: true,
  loadUserInfo: true,
};

export default settings;
