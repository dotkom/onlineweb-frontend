import { IEventViewProps } from 'events/models/Event';
import React, { ReactNode } from 'react';
import CalendarEvents from './CalendarEvents';
import ImageEvents from './ImageEvents';
import ListEvents from './ListEvents';

export interface IProps extends IEventViewProps {
  children: ReactNode;
}

const Wrapper = ({ children, ...props }: IProps) => {
  return (
    <CalendarEvents {...props}>
      <ImageEvents {...props}>
        <ListEvents {...props}>{children}</ListEvents>
      </ImageEvents>
    </CalendarEvents>
  );
};

export default Wrapper;
