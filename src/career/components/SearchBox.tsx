import React, { ChangeEvent, memo, useCallback } from 'react';

import { setCareerFilterQuery } from 'career/slices/careerOpportunities';
import { useDispatch, useSelector } from 'core/redux/hooks';

import style from '../less/career.less';

const SearchBox = memo(() => {
  const dispatch = useDispatch();
  const query = useSelector((state) => state.careerOpportunities.filters.query);

  const setQuery = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      dispatch(setCareerFilterQuery(event.target.value));
    },
    [dispatch]
  );

  return (
    <div>
      <h2>Søk</h2>
      <input className={style.searchBox} type="search" value={query} onChange={setQuery} />
    </div>
  );
});

export default SearchBox;
