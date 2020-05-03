import React, { FC, useState, useEffect } from 'react';

import { SearchInput } from 'common/components/Forms/SearchInput';
import { useDispatch, useSelector } from 'core/redux/hooks';
import { State } from 'core/redux/Store';
import { filterCompanies, resetCompanyPage } from 'companies/slices/companies';

import style from './SearchBar.less';

export const SearchBar: FC = () => {
  const dispatch = useDispatch();
  const page = useSelector(selectCurrentPage());
  const [query, setQuery] = useState('');

  useEffect(() => {
    dispatch(filterCompanies({ query, page }));
  }, [query, page]);

  useEffect(() => {
    dispatch(resetCompanyPage());
  }, [query]);

  return (
    <div className={style.searchBar}>
      <SearchInput defaultValue={query} onChange={(event) => setQuery(event.target.value)} />
    </div>
  );
};

const selectCurrentPage = () => (state: State) => {
  return state.companies.search.page;
};
