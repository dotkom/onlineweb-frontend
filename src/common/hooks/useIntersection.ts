import { RefObject, useEffect, useRef, useState } from 'react';

export type Ref = RefObject<HTMLDivElement>;
export type Entry = IntersectionObserverEntry;

export const useIntersection = (options?: IntersectionObserverInit): [Entry | null, Ref] => {
  const targetRef = useRef<HTMLDivElement>(null);
  const [observerEntry, setEntry] = useState<Entry | null>(null);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (count !== 0) {
      const observer = new IntersectionObserver((entries) => {
        const [firstEntry] = entries;
        setEntry(firstEntry);
      }, options);
      if (targetRef.current) {
        observer.observe(targetRef.current);
      }
      return () => observer.disconnect();
    }
    setCount((oldCount) => oldCount + 1);
    return;
  }, [targetRef.current]);
  return [observerEntry, targetRef];
};
