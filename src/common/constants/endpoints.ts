
export const DOMAIN = process.env.OW4_ADDRESS || "https://online.ntnu.no";
export const STATIC_URL = DOMAIN + '/static/';

export const AUTH = DOMAIN + '/api/v1/sso/openid/';
export const EVENTS = DOMAIN + '/api/v1/events/';
export const EVENT = DOMAIN + '/api/v1/event/';
