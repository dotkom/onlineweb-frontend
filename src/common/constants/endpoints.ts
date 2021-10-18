export const DOMAIN = process.env.OW4_ADDRESS || '';

export const MEDIA_BASE_URL = `${process.env.OW4_MEDIA_PROTO}://${process.env.OW4_MEDIA_HOST}`;
export const API_BASE_URL = `${process.env.OW4_API_PROTO}://${process.env.OW4_API_HOST}`;

export const AUTH = DOMAIN + '/api/v1/sso/openid/';
export const EVENTS = DOMAIN + '/api/v1/events/';
export const EVENT = DOMAIN + '/api/v1/event/';
