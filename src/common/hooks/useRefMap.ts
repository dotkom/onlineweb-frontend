import { createRef, useMemo, useState } from 'react';

export interface IRefObject<T, K> {
  value: T;
  ref: React.RefObject<K>;
}

const createRefs = <K, T>(values: T[]): Array<IRefObject<T, K>> => {
  return values.map((value) => ({
    value,
    ref: createRef<K>(),
  }));
};

/**
 * Creates a list of refs for a list of objects or primitives.
 */
export const useRefMap = <K, T>(values: T[]): [Array<IRefObject<T, K>>, (values: T[]) => void] => {
  /** Create initalRefs only once */
  const initialRefs = useMemo(() => createRefs<K, T>(values), []);

  /** Set ref objects to state, so they are updated on change */
  const [refObjects, setRefObjects] = useState(initialRefs);

  const updateRefObjects = (newValues: T[]) => {
    const newRefObjects = createRefs<K, T>(newValues);
    setRefObjects(newRefObjects);
  };

  return [refObjects, updateRefObjects];
};
