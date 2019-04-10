import clientCookies from 'js-cookie';
import { DateTime } from 'luxon';
import React, { createContext, ReactNode, useReducer } from 'react';

import { __CLIENT__ } from 'common/constants/environment';
import { EventView } from 'events/models/Event';
import { getEventView, getFrontpageEventView } from 'events/utils/eventView';

/**
 * All available cookies should de declared as optionals here.
 * This lets us have som more control of what cookies are avaiable.
 */
export interface ICookies {
  frontpageEventView: EventView;
  eventView: EventView;
  searchText: string;
  timeStart: DateTime;
  timeEnd: DateTime;
}

const initializeCookies = (inital: { [name: string]: any }): ICookies => ({
  ...inital,
  frontpageEventView: getFrontpageEventView(inital.eventView),
  eventView: getEventView(inital.eventView),
  searchText: '',
  timeStart: DateTime.local().minus({ years: 5 }),
  timeEnd: DateTime.local().plus({ years: 5 }),
});

export interface IProps {
  children: ReactNode;
  cookies: { [name: string]: any };
}

export enum CookieActionType {
  CHANGE,
}

export interface ICookieAction {
  type: CookieActionType;
  value: Partial<ICookies>;
}

const setCookies = (cookies: ICookies) => {
  if (__CLIENT__) {
    Object.entries(cookies).forEach(([name, value]) => {
      clientCookies.set(name, value);
    });
  }
};

const cookieReducer: React.Reducer<ICookies, ICookieAction> = (prevState, action) => {
  switch (action.type) {
    case CookieActionType.CHANGE:
      const newState = {
        ...prevState,
        ...action.value,
      };
      setCookies(newState);
      return newState;
  }
};

export interface ICookieContextState {
  cookies: ICookies;
  dispatch: React.Dispatch<ICookieAction>;
}

export const CookieContext = createContext({} as ICookieContextState);

export const Cookies = ({ children, cookies: initialCookies }: IProps) => {
  const initializedCookies = initializeCookies(initialCookies);
  const [cookies, dispatch] = useReducer(cookieReducer, initializedCookies);
  return <CookieContext.Provider value={{ cookies, dispatch }}>{children}</CookieContext.Provider>;
};

export default Cookies;
