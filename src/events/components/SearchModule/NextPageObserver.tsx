import React, { FC, useEffect, useState } from 'react';

import { useIntersection } from 'common/hooks/useIntersection';
import { useDispatch } from 'core/redux/hooks';
import { nextEventPage } from 'events/slices/events';

export const NextPageObserver: FC = () => {
  const dispatch = useDispatch();
  const [observer, ref] = useIntersection();
  const [count, setCount] = useState(0); // TODO: Implement inside useIntersection somehow.

  useEffect(() => {
    if (observer && observer.isIntersecting && count !== 0) {
      dispatch(nextEventPage());
    }
    // TODO: Figure out why this is needed, and implement it inside the hook.
    setCount((stateCount) => stateCount + 1);
  }, [observer, dispatch]);
  return <span ref={ref}></span>;
};
