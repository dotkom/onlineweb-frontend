import { useRouter } from 'next/router';
import qs from 'query-string';

export const useQueryParam = (key: string): [string | null, (value: string | null) => void] => {
  const router = useRouter();
  const search = qs.stringify(router.query);
  const params = new URLSearchParams(search);
  const value = params.get(key);

  const setValue = (newValue: string | null) => {
    if (newValue) {
      params.set(key, newValue);
    } else {
      params.delete(key);
    }
    router.replace(`${location.pathname}?${params}`);
  };

  return [value, setValue];
};
