import { IEventViewProps } from 'events/models/Event';
import React, { ReactNode } from 'react';
import { IServerStateCacheEvents } from 'server/stateCache';
import CalendarEvents from './CalendarEvents';
import ImageEvents from './ImageEvents';
import ListEvents from './ListEvents';

export interface IProps extends IServerStateCacheEvents, IEventViewProps {
  children: ReactNode;
}

const Wrapper = ({ children, image, list, calendar, ...props }: IProps) => {
  return (
    <CalendarEvents cache={calendar} {...props}>
      <ImageEvents cache={image} {...props}>
        <ListEvents cache={list} {...props}>{children}</ListEvents>
      </ImageEvents>
    </CalendarEvents>
  );
};

export default Wrapper;
