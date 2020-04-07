import React, { createContext, FC, useContext, useEffect, useMemo, useState } from 'react';
import ReactDOM from 'react-dom';

import { UserContext } from 'authentication/providers/UserProvider';
import { getProfilesIterator } from 'profile/api/search';
import { IPublicProfile } from 'profile/models/User';

export interface IState {
  search?: string;
  group?: string;
  range: [number, number];
  setSearch: (search: string) => void;
  setGroup: (group: string) => void;
  setRange: (range: [number, number]) => void;
  profiles: IPublicProfile[];
  nextPage: () => void;
}

const INITIAL_STATE: IState = {
  range: [1, 6],
  setSearch: (_) => {
    throw new Error('setSearch method not overwritten');
  },
  setGroup: (_) => {
    throw new Error('setGroup method not overwritten');
  },
  setRange: (_) => {
    throw new Error('setRange method not overwritten');
  },
  profiles: [],
  nextPage: () => {
    throw new Error('nextPage method not overwritten');
  },
};

export const ProfileSearchContext = createContext(INITIAL_STATE);

export const ProfileSearchProvider: FC = ({ children }) => {
  const { user } = useContext(UserContext);
  /** Should not be able to render this page without an authenticated user */
  if (!user) {
    return null;
  }

  const [search, setSearch] = useState<string | undefined>(undefined);
  const [group, setGroup] = useState<string | undefined>(undefined);
  const [range, setRange] = useState<[number, number]>([1, 6]);

  const [profiles, setProfiles] = useState<IPublicProfile[]>([]);
  /** Restrict possibility of calling nextPage until the first page of current query has been added to state. */
  const [ready, setReady] = useState(false);

  /** Initialize fetch iterator. Needs to be renewed when parameters are changed, as 'page' is internal state */
  const initialFetcher = useMemo(() => getProfilesIterator({ search, group, range }, user), []);
  const [profilesFetcher, setProfilesFetcher] = useState(initialFetcher);

  /** Reset list of profiles. Fetches first 'page' of results for the result */
  const reset = async () => {
    const fetcher = getProfilesIterator({ search, group, range }, user);
    const { value: firstProfiles = [] } = await fetcher.next();
    ReactDOM.unstable_batchedUpdates(() => {
      setProfilesFetcher(fetcher);
      setProfiles(firstProfiles);
      setReady(true);
    });
  };

  /** Call next page to iterate/yield naxt page of API results */
  const nextPage = useMemo(
    () => async () => {
      const { value: nextProfiles } = await profilesFetcher.next();
      if (nextProfiles && ready) {
        setProfiles((current) => current.concat(nextProfiles));
      }
    },
    [profilesFetcher]
  );

  /** Reset search results when any parameter is changed */
  useEffect(() => {
    reset();
  }, [search, group, JSON.stringify(range)]);

  const value: IState = {
    search,
    setSearch,
    group,
    setGroup,
    range,
    setRange,
    profiles,
    nextPage,
  };
  return <ProfileSearchContext.Provider value={value}>{children}</ProfileSearchContext.Provider>;
};

export default ProfileSearchProvider;
