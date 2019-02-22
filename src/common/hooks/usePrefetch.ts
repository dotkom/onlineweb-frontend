import { useContext } from 'react';

import { PreFetchContext } from 'common/providers/Prefetched';
import { PrefetchKey } from 'common/utils/PrefetchState';

export const usePrefetch = <T>(key: PrefetchKey, fetcher?: () => Promise<T>) => {
  const prefetcher = useContext(PreFetchContext);
  let data;
  if (prefetcher.has(key)) {
    data = prefetcher.get(key) as T;
  } else if (fetcher) {
    prefetcher.queue(fetcher, key);
  }
  return data;
};
