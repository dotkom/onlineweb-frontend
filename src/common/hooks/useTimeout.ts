import { DateTime } from 'luxon';
import { useEffect, useState } from 'react';

/**
 * Hook for setting a timeout.
 * @param {number} ms Milliseconds until the timeout finishes.
 * @returns {boolean} Wether the timeout has finished.
 */
export const useTimeout = (ms: number = 0): boolean => {
  const [done, setDone] = useState(false);

  useEffect(() => {
    const trigger = () => setDone(true);
    const timer = setTimeout(trigger, ms);
    const clear = () => clearTimeout(timer);
    return clear;
  }, [ms, done]);

  return done;
};

export const useDateTimeout = (time: DateTime) => {
  const diff = time.diffNow().milliseconds;
  return useTimeout(diff);
};

export default useTimeout;
