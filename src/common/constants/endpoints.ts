export const DOMAIN = `${process.env.OW4_SCHEME}://${process.env.OW4_HOST}` || '';

export const AUTH = DOMAIN + '/api/v1/sso/openid/';
export const EVENTS = DOMAIN + '/api/v1/events/';
export const EVENT = DOMAIN + '/api/v1/event/';
