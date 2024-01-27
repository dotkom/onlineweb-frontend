import { AUTH_DOMAIN, DOMAIN } from 'common/constants/endpoints';
import { UserManagerSettings } from 'oidc-client-ts';

const settings: UserManagerSettings = {
  authority: AUTH_DOMAIN,
  client_id: process.env.OW4_SSO_CLIENT_ID || '',
  redirect_uri: process.env.OW4_SSO_CALLBACK || '',
  post_logout_redirect_uri: DOMAIN + '/',
  scope: 'openid profile',
  automaticSilentRenew: false,
  filterProtocolClaims: true,
  loadUserInfo: true,
  revokeTokenTypes: ["refresh_token"],
  metadata: {
    "authorization_endpoint": "https://prd.auth.online.ntnu.no/oauth2/authorize",
    "issuer": "https://cognito-idp.eu-north-1.amazonaws.com/eu-north-1_RJ3QXGhwo",
    "jwks_uri": "https://cognito-idp.eu-north-1.amazonaws.com/eu-north-1_RJ3QXGhwo/.well-known/jwks.json",
    "response_types_supported": ["code", "token"],
    "scopes_supported": ["openid", "email", "phone", "profile"],
    "subject_types_supported": ["public"],
    "token_endpoint": "https://prd.auth.online.ntnu.no/oauth2/token",
    "token_endpoint_auth_methods_supported": ["client_secret_basic", "client_secret_post"],
    "userinfo_endpoint": "https://prd.auth.online.ntnu.no/oauth2/userInfo",
    // we need to duplicate all above from /.well-known/openid-configuiration since it does not include the end_session_endpoint
    end_session_endpoint: `https://prd.auth.online.ntnu.no/logout`,
    // revocation_endpoint: `${AUTH_DOMAIN}oauth2/revoke`
  }
};

export default settings;
