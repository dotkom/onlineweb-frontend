import React from 'react';

import { IProfileProps } from 'profile';
import ProfileSearchProvider from 'profile/providers/SearchFilter';

import Searchbar from './Searchbar';
import { Users } from './Users';

export interface IProps extends IProfileProps {}

export const Search = () => {
  return (
    <ProfileSearchProvider>
      <Searchbar />
      <Users />
    </ProfileSearchProvider>
  );
};

export default Search;
