import { DateTime } from 'luxon';
import { useEffect, useMemo } from 'react';

import { useDecrement } from './useDecrement';

const DEFAULT_TICK = 1000;

const calculateOffset = (time: DateTime, tick: number): number => {
  const endTime = time.toMillis();
  const now = DateTime.local().toMillis();
  return (endTime - now) / tick;
};

/**
 * Hook for counting down toward a specific DateTime.
 * @param endTime
 * @param tick How often the timer should update. Defaults to every second.
 * @returns Seconds remaining until the countdown is finished.
 */
export const useCountDown = (endTime: DateTime, tick = DEFAULT_TICK): number => {
  const duration = useMemo(() => calculateOffset(endTime, tick), [endTime.toMillis()]);
  const [remaining, decrement] = useDecrement(duration);
  useEffect(() => {
    const timeout = setTimeout(decrement, tick);
    const clear = () => clearTimeout(timeout);
    return clear;
  }, [remaining]);
  return remaining;
};
