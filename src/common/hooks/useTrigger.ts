import { DateTime } from 'luxon';
import { useEffect } from 'react';

export interface ITrigger {
  func: () => void;
  time: DateTime;
}

/**
 * @summary Trigger a function call at a specific DateTime.
 */
export const useTrigger = (time: DateTime, trigger: () => void): void => {
  useEffect(() => {
    const duration = time.diffNow().milliseconds;
    const timer = setTimeout(trigger, duration);
    const clear = () => clearTimeout(timer);
    return clear;
  }, []);
};

export const useTriggers = (triggers: ITrigger[]) => {
  triggers.forEach(({ time, func }) => useTrigger(time, func));
};

export default useTrigger;
