import { useEffect, useRef, useState } from 'react';

export const useBoundingRect = <T extends HTMLElement>() => {
  const ref = useRef<T>(null);
  const [boundingRect, setBoundingRect] = useState<ClientRect | DOMRect | null>(null);

  const updateBoundingRect = () => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      setBoundingRect(rect);
    }
  };

  useEffect(() => {
    updateBoundingRect();
  }, [ref, ref.current]);

  const handleResize = () => {
    updateBoundingRect();
  };

  useEffect(() => {
    if (ref.current) {
      window.addEventListener('resize', handleResize);
    }
    return () => {
      if (ref.current) {
        window.removeEventListener('resize', handleResize);
      }
    };
  }, []);

  return [ref, boundingRect] as [typeof ref, typeof boundingRect];
};
