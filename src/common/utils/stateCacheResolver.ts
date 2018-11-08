import { __CLIENT__ } from 'common/constants/environment';
import { IServerStateCache } from 'server/stateCache';

/**
 * IMPORTANT: Using it ouside of functions or classes can result in problems!
 * The state this function reads from make not exist yet.
 * 
 * @summary: Get the relevant version of the StateCache for use in the back-end or front-end.
 */
export const getStateCache = () => {
  if (__CLIENT__) {
    const a = JSON.parse(window.__INITIAL_PROVIDER_STATE__ || '') as IServerStateCache;
    return a;
  } else {
    return global.STATE_CACHE as IServerStateCache;
  }
}
