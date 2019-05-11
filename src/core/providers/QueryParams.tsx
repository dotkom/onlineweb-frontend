import React, { createContext, ReactNode } from 'react';
import { RouteComponentProps, withRouter } from 'react-router';
import { useQueryParamsState } from '../hooks/useQueryParamsState';

export const QueryParams = createContext({} as ReturnType<typeof useQueryParamsState>);

export interface IProps extends RouteComponentProps {
  children: ReactNode;
}

export const QueryParamsProvider = ({ location, children }: IProps) => {
  const queryParams = useQueryParamsState(location);
  return <QueryParams.Provider value={queryParams}>{children}</QueryParams.Provider>;
};

export const QueryParamsProviderWithRouter = withRouter(QueryParamsProvider);
