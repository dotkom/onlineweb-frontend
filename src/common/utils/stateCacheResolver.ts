import { __CLIENT__, __SERVER__ ,__SSR__ } from 'common/constants/environment';
import { IServerStateCache } from 'server/stateCache';

/**
 * IMPORTANT: Using it ouside of functions or classes can result in problems!
 * The state this function reads from make not exist yet.
 * 
 * @summary: Get the relevant version of the StateCache for use in the back-end or front-end.
 */
export const getStateCache = (): IServerStateCache | null => {
  if (!__SSR__) {
    return null;
  } else if (__CLIENT__) {
    return JSON.parse(window.__INITIAL_PROVIDER_STATE__) as IServerStateCache;
  } else if (__SERVER__) {
    return global.STATE_CACHE as IServerStateCache;
  } else {
    return null;
  }
}
