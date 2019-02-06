import { DateTime } from 'luxon';
import { useEffect } from 'react';

import { useDecrement } from './useDecrement';

const calculateOffset = (time: DateTime): number => {
  const endTime = time.toMillis();
  const now = DateTime.local().toMillis();
  return (endTime - now) / 1000;
};

/**
 * Hook for counting down toward a specific DateTime.
 * @param endTime
 * @returns {number} Seconds remaining until the countdown is finished.
 */
export const useCountDown = (endTime: DateTime): number => {
  const duration = calculateOffset(endTime);
  const [remaining, decrement] = useDecrement(duration);
  useEffect(() => {
    const interval = setInterval(decrement, 1000);
    const clear = () => clearInterval(interval);
    return clear;
  }, [remaining]);
  return remaining;
};
