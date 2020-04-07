import React from 'react';

import ProfileSearchProvider from 'profile/providers/SearchFilter';

import Searchbar from './Searchbar';
import { Users } from './Users';

export const Search = () => {
  return (
    <ProfileSearchProvider>
      <Searchbar />
      <Users />
    </ProfileSearchProvider>
  );
};

export default Search;
