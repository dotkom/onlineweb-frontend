import React, { createContext, ReactNode } from 'react';
import { useQueryParamsState } from '../hooks/useQueryParamsState';

export const QueryParams = createContext({} as ReturnType<typeof useQueryParamsState>);

interface IProps {
  children: ReactNode;
}

export const QueryParamsProvider = ({ children }: IProps) => {
  const queryParams = useQueryParamsState();
  return <QueryParams.Provider value={queryParams}>{children}</QueryParams.Provider>;
};
