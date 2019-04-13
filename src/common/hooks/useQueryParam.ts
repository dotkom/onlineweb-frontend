import { useContext } from 'react';
import { __RouterContext } from 'react-router-dom';

export const useQueryParam = (key: string): [string | null, (value: string | null) => void] => {
  const { location, history } = useContext(__RouterContext);

  const params = new URLSearchParams(location.search);
  const value = params.get(key);

  const setValue = (newValue: string | null) => {
    if (newValue) {
      params.set(key, newValue);
    } else {
      params.delete(key);
    }
    history.replace(`${location.pathname}?${params}`);
  };

  return [value, setValue];
};
