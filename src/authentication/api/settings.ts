import { UserManagerSettings } from 'oidc-client';

import { DOMAIN } from 'common/constants/endpoints';
import { __CLIENT__ } from 'common/constants/environment';
import { getAuthCallbackUrl, getFrontPageUrl } from 'core/appUrls';

const getCallbackUrl = () => (__CLIENT__ ? `${window.location.origin}${getAuthCallbackUrl().as}` : '');
const getPostLogoutRedirectUrl = () => (__CLIENT__ ? `${window.location.origin}${getFrontPageUrl().as}` : '');

const settings: UserManagerSettings = {
  authority: DOMAIN + '/openid',
  client_id: process.env.OW4_SSO_CLIENT_ID || '',
  redirect_uri: getCallbackUrl(),
  post_logout_redirect_uri: getPostLogoutRedirectUrl(),
  response_type: 'id_token token',
  scope: 'openid profile onlineweb4',
  automaticSilentRenew: true,
  filterProtocolClaims: true,
  loadUserInfo: true,
};

export default settings;
