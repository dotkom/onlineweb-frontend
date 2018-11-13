import { __SSR__ } from 'common/constants/environment';
import { EMPTY_STATE_CACHE, IServerStateCache } from 'server/models';

/**
 * IMPORTANT: Using it ouside of functions or classes can result in problems!
 * The state this function reads from make not exist yet.
 *
 * @summary: Get the relevant version of the StateCache for use in the back-end or front-end.
 */
export const getStateCache = (): IServerStateCache => {
  if (__SSR__) {
    return JSON.parse(window.__INITIAL_PROVIDER_STATE__) as IServerStateCache;
  } else {
    return EMPTY_STATE_CACHE;
  }
};
