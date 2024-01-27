export const DOMAIN = process.env.OW4_ADDRESS || '';
export const AUTH_DOMAIN = process.env.OWF_AUTH_DOMAIN || '';

export const AUTH = DOMAIN + '/api/v1/sso/openid/';
export const EVENTS = DOMAIN + '/api/v1/events/';
export const EVENT = DOMAIN + '/api/v1/event/';
