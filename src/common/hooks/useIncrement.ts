import { useState } from 'react';

/**
 * Simple hooks for incrementing a number.
 */
export const useIncrement = (startValue: number): [number, () => void] => {
  const [current, setCurrent] = useState(startValue);
  const increment = () => setCurrent(current + 1);
  return [current, increment];
};

export default useIncrement;
