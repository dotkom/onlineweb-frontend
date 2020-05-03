import React, { FC, useEffect, useState } from 'react';

import { useIntersection } from 'common/hooks/useIntersection';
import { useDispatch, useSelector } from 'core/redux/hooks';
import { State } from 'core/redux/Store';

import style from './NextPageObserver.less';
import { nextCompanyPage } from 'companies/slices/companies';

export const NextPageObserver: FC = () => {
  const dispatch = useDispatch();
  const isPending = useSelector(selectIsSearchPending());
  const totalCount = useSelector(selectTotalCount());
  const currentCount = useSelector(selectCurrentCount());
  const [observer, ref] = useIntersection();
  const [renderCount, setRenderCount] = useState(0); // TODO: Implement inside useIntersection somehow.

  const isSearchCompleted = totalCount === currentCount;

  useEffect(() => {
    if (observer && observer.isIntersecting && renderCount !== 0 && !isSearchCompleted && !isPending) {
      dispatch(nextCompanyPage());
    }
    // TODO: Figure out why this is needed, and implement it inside the hook.
    setRenderCount((current) => current + 1);
  }, [dispatch, observer, isSearchCompleted, isPending]);

  return (
    <>
      <p className={style.infoText}>{`Viser ${currentCount} av ${totalCount} resultater for dette søket`}</p>
      <p className={style.infoText}>{isPending && 'Henter flere resultater...'}</p>
      <span ref={ref}></span>
    </>
  );
};

const selectIsSearchPending = () => (state: State) => {
  return state.companies.search.loading === 'pending';
};

const selectTotalCount = () => (state: State) => {
  return state.companies.search.count;
};

const selectCurrentCount = () => (state: State) => {
  return state.companies.search.ids.length;
};
