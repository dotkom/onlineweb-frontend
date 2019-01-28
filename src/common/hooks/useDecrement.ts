import { useState } from 'react';

/**
 * Simple hooks for decrementing a number.
 */
export const useDecrement = (startValue: number): [number, () => void] => {
  const [current, setCurrent] = useState(startValue);
  const decrement = () => setCurrent(current - 1);
  return [current, decrement];
};

export default useDecrement;
