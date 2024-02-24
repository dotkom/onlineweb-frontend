export const DOMAIN = process.env.OW4_ADDRESS || '';
export const HOST = process.env.NODE_ENV === "production"
    ? `https://${process.env.HOSTNAME}`
    : `http://${process.env.HOSTNAME}:${process.env.PORT}`;

export const AUTH = DOMAIN + '/api/v1/sso/openid/';
export const EVENTS = DOMAIN + '/api/v1/events/';
export const EVENT = DOMAIN + '/api/v1/event/';
