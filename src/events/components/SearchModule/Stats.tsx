import React, { FC } from 'react';

import { useSelector } from 'core/redux/hooks';
import { State } from 'core/redux/Store';

import style from './Stats.less';

export const Stats: FC = () => {
  const isPending = useSelector(selectIsSearchPending());
  const count = useSelector(selectSearchCount());
  return (
    <div className={style.container}>
      <p>{isPending && 'Søker...'}</p>
      <p>Antall resultater: {count}</p>
    </div>
  );
};

const selectIsSearchPending = () => (state: State) => {
  return state.events.search.loading === 'pending';
};

const selectSearchCount = () => (state: State) => {
  return state.events.search.count;
};
